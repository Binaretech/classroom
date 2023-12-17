import { Injectable } from '@nestjs/common';
import ClassRepository from '../database/repository/class.repository';
import JoinClassDTO from './dto/join-class.dto';
import { CreateClassDTO } from './dto/create-class.dto';
import PostRepository from '../database/repository/post.repository';
import admin from 'firebase-admin';

@Injectable()
export class ClassService {
  constructor(
    private readonly classRepository: ClassRepository,
    private readonly postRepository: PostRepository,
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

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  join(request: JoinClassDTO, userId: string) {
    // TODO
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

  async isClassMember(id: number, userId: string) {
    const isOwner = await this.isClassOwner(id, userId);

    return isOwner;
  }
}
