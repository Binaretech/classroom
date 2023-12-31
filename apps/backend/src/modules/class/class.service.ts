import { Injectable, NotFoundException } from '@nestjs/common';
import ClassRepository from '../database/repository/class.repository';
import JoinClassDTO from './dto/join-class.dto';
import { CreateClassDTO } from './dto/create-class.dto';
import PostRepository from '../database/repository/post.repository';
import admin from 'firebase-admin';
import StudentRepository from '../database/repository/student.repository';
import MemberRepository from '../database/repository/member.repository';

@Injectable()
export class ClassService {
  constructor(
    private readonly classRepository: ClassRepository,
    private readonly postRepository: PostRepository,
    private readonly studentRepository: StudentRepository,
    private readonly memberRepository: MemberRepository,
  ) {}

  async list(userId: string, page: number = 1, limit: number = 10) {
    const offset = (page - 1) * limit;
    const [classes, count] = await this.classRepository.findAndCount(
      {
        ownerId: userId,
      },
      {
        limit: limit,
        offset: offset,
      },
    );
    return { classes, count };
  }

  async get(id: number, userId: string) {
    const classEntity = await this.classRepository.findOne({
      id: id,
      ownerId: userId,
    });

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

  async join(request: JoinClassDTO, userId: string) {
    const classEntity = await this.classRepository.findOne({
      code: request.code,
    });

    if (!classEntity) {
      throw new NotFoundException();
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
}
