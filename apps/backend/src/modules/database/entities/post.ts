import {
  Entity,
  EntityRepositoryType,
  ManyToOne,
  PrimaryKey,
  Property,
} from '@mikro-orm/core';
import { Class } from './class';
import PostRepository from '../repository/post.repository';

@Entity({ customRepository: () => PostRepository })
export class Post {
  constructor(data: Partial<Post>) {
    Object.assign(this, data);
  }

  @PrimaryKey()
  id!: number;

  @Property({ columnType: 'text' })
  content!: string;

  @Property()
  author!: string;

  @Property()
  createdAt: Date = new Date();

  @Property({ onUpdate: () => new Date() })
  updatedAt: Date = new Date();

  @ManyToOne()
  class!: Class;

  [EntityRepositoryType]?: PostRepository;
}
