import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import ClassRepository from '../database/repository/class.repository';
import JoinClassDTO from './dto/join-class.dto';
import { CreateClassDTO } from './dto/create-class.dto';
import PostRepository from '../database/repository/post.repository';
import admin from 'firebase-admin';
import StudentRepository from '../database/repository/student.repository';
import MemberRepository from '../database/repository/member.repository';
import { EntityData } from '@mikro-orm/core';
import { Class } from '../database/entities/class';
import { Invitation, InvitationStatus } from '../database/entities/invitations';
import { nanoid } from 'nanoid';
import { UserService } from '../user/user.service';
import InvitationRepository from '../database/repository/invitation.repository';

@Injectable()
export class ClassService {
  constructor(
    private readonly userService: UserService,
    private readonly classRepository: ClassRepository,
    private readonly postRepository: PostRepository,
    private readonly studentRepository: StudentRepository,
    private readonly memberRepository: MemberRepository,
    private readonly invitationRepository: InvitationRepository,
  ) {}

  async exists(id: number): Promise<boolean> {
    const entity = await this.classRepository.findOne(id);
    return !!entity;
  }

  async list(userId: string, page: number = 1, limit: number = 10) {
    const offset = (page - 1) * limit;

    const [ids, count] = await this.memberRepository.findAndCount(
      {
        userId,
      },
      {
        populate: ['classId'],
      },
    );

    const classes = await this.classRepository.find(
      {
        id: { $in: ids.map((member) => member.classId) },
      },
      {
        limit: limit,
        offset: offset,
      },
    );

    return { classes, count };
  }

  async get(id: number, isOwner: boolean = false) {
    const classEntity = await this.classRepository.findOne(
      {
        id: id,
      },
      {
        fields: isOwner
          ? ['*']
          : ['id', 'name', 'description', 'section', 'ownerId'],
      },
    );

    return classEntity;
  }

  create(request: CreateClassDTO, userId: string) {
    return this.classRepository.insert({
      name: request.name,
      description: request.description,
      ownerId: userId,
      section: request.section,
    });
  }

  async generateCode(classId: number) {
    const entity = await this.classRepository.findOne({
      id: classId,
    });

    if (!entity) {
      throw new NotFoundException('errors.notFound');
    }

    const em = this.classRepository.getEntityManager();

    entity.code = this.classRepository.generateCode();

    await em.flush();

    return entity;
  }

  async removeCode(classId: number) {
    const entity = await this.classRepository.findOne({
      id: classId,
    });

    const em = this.classRepository.getEntityManager();

    entity.code = null;

    await em.flush();

    return entity;
  }

  archive(id: number) {
    return this.classRepository.nativeUpdate(
      {
        id,
      },
      {
        archived: true,
      },
    );
  }

  unarchive(id: number) {
    return this.classRepository.nativeUpdate(
      {
        id,
      },
      {
        archived: false,
      },
    );
  }

  delete(id: number) {
    return this.classRepository.nativeDelete({
      id,
    });
  }

  update(id: number, request: Partial<CreateClassDTO>) {
    const data = Object.entries(request).reduce((acc, [key, value]) => {
      if (value) {
        acc[key] = value;
      }

      return acc;
    }, {} as EntityData<Class>);

    return this.classRepository.nativeUpdate(
      {
        id,
      },
      data,
    );
  }

  async join(request: JoinClassDTO, userId: string) {
    const classEntity = await this.classRepository.findOne({
      code: request.code,
    });

    const isMember = await this.isClassMember(classEntity.id, userId);

    if (isMember) {
      throw new BadRequestException('errors.alreadyJoined');
    }

    return await this.studentRepository.insert({
      userId: userId,
      class: classEntity,
    });
  }

  async getPosts(classId: number, page: number = 1, limit: number = 10) {
    const offset = (page - 1) * limit;

    const [posts, count] = await this.postRepository.findAndCount(
      { class: classId },
      { limit: limit, offset: offset, orderBy: { createdAt: 'DESC' } },
    );

    const authorIds = posts.map((post) => ({ uid: post.authorId }));

    const users = await admin.auth().getUsers(authorIds);

    const userMap = users.users.reduce((acc, user) => {
      acc[user.uid] = user;
      return acc;
    }, {});

    posts.forEach((post) => {
      const author = userMap[post.authorId];
      post.author = {
        uid: author.uid,
        displayName: author.displayName,
        photoURL: author.photoURL,
        email: author.email,
      };
    });

    return { posts, count };
  }

  async createPost(classId: number, userId: string, content: string) {
    const classEntity = await this.classRepository.findOne({
      id: classId,
      ownerId: userId,
    });

    if (!classEntity) {
      throw new Error('Class not found');
    }

    const post = await this.postRepository.insert({
      content: content,
      authorId: userId,
      class: classEntity,
    });

    const author = await admin.auth().getUser(userId);

    post.author = {
      uid: author.uid,
      displayName: author.displayName,
      photoURL: author.photoURL,
      email: author.email,
    };

    return post;
  }

  async isClassOwner(id: number, userId: string) {
    const classEntity = await this.classRepository.findOne({
      id: id,
      ownerId: userId,
    });

    return !!classEntity;
  }

  async isClassStudent(id: number, userId: string) {
    const student = await this.studentRepository.findOne({
      class: id,
      userId: userId,
    });

    return !!student;
  }

  async isClassMember(id: number, userId: string) {
    const isOwner = await this.isClassOwner(id, userId);

    const isStudent = await this.isClassStudent(id, userId);

    return isOwner || isStudent;
  }

  async getMembers(classId: number, page: number = 1, limit: number = 10) {
    const offset = (page - 1) * limit;

    const [members, count] = await this.memberRepository.findAndCount(
      { classId: classId },
      { limit: limit, offset: offset },
    );

    const ids = members.map((member) => ({
      uid: member.userId,
    }));

    const { users } = await admin.auth().getUsers(ids);

    const userMap = users.reduce((acc, user) => {
      acc[user.uid] = user;
      return acc;
    }, {});

    members.forEach((member) => {
      const user = userMap[member.userId];
      member.user = {
        uid: user.uid,
        displayName: user.displayName,
        photoURL: user.photoURL,
        email: user.email,
      };
    });

    return { members, count };
  }

  async resetCode(id: number) {
    const entity = await this.classRepository.findOne({
      id: id,
    });

    if (!entity) {
      throw new NotFoundException('errors.classNotFound');
    }

    const em = this.classRepository.getEntityManager();

    entity.code = await this.classRepository.generateCode();

    await em.flush();

    return entity;
  }

  async deleteCode(id: number) {
    const entity = await this.classRepository.findOne({
      id: id,
    });

    const em = this.classRepository.getEntityManager();

    entity.code = null;

    await em.flush();

    return entity;
  }

  async invite(id: number, email: string) {
    const entity = await this.classRepository.findOne({
      id: id,
    });

    const invitation = new Invitation({
      invitedEmail: email,
      status: InvitationStatus.Pending,
      code: nanoid(16),
    });

    entity.invitations.add(invitation);

    const em = this.classRepository.getEntityManager();

    await em.flush();

    return invitation.code;
  }

  async isValidInvitation(classId: number, code: string) {
    const invitation = await this.invitationRepository.findOne({
      code: code,
      class: { id: classId },
    });

    if (!invitation) {
      return false;
    }

    return invitation.status === InvitationStatus.Pending;
  }

  async joinByInvitation(classId: number, code: string, userId: string) {
    const invitation = await this.invitationRepository.findOne({
      code: code,
      class: { id: classId },
    });

    if (!invitation) {
      throw new NotFoundException('errors.notFound');
    }

    if (invitation.status !== InvitationStatus.Pending) {
      throw new BadRequestException('errors.invitationExpired');
    }

    const isMember = await this.isClassMember(classId, userId);

    if (isMember) {
      throw new BadRequestException('errors.alreadyJoined');
    }

    invitation.status = InvitationStatus.Accepted;

    const em = this.invitationRepository.getEntityManager();

    await em.flush();

    const classEntity = await this.classRepository.findOne(classId); // Retrieve the Class entity using the classId

    return this.studentRepository.insert({
      userId,
      class: classEntity,
    });
  }

  async isAlreadyInvited(classId: number, email: string) {
    const user = await this.userService.findByEmail(email);

    if (!user) {
      return false;
    }

    const isMember = await this.isClassMember(classId, user.uid);

    return isMember;
  }

  async canSendInvitation(classId: number, email: string) {
    const user = await this.userService.findByEmail(email);

    if (!user) {
      return true;
    }

    const isMember = await this.isClassMember(classId, user.uid);

    return !isMember;
  }

  async leave(classId: number, userId: string) {
    const isOwner = await this.isClassStudent(classId, userId);

    if (isOwner) {
      throw new ForbiddenException('errors.forbidden');
    }

    return this.studentRepository.nativeDelete({
      userId,
      class: classId,
    });
  }
}
