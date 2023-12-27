import {
  Collection,
  Entity,
  EntityRepositoryType,
  OneToMany,
  PrimaryKey,
  Property,
} from '@mikro-orm/core';
import ClassRepository from '../repository/class.repository';
import { Post } from './post';
import { Student } from './student';

@Entity({ customRepository: () => ClassRepository })
export class Class {
  constructor(data: Partial<Class>) {
    Object.assign(this, data);
  }

  @PrimaryKey({ type: 'bigint', autoincrement: true })
  id!: number;

  @Property({ length: 64 })
  name!: string;

  @Property({ length: 255, nullable: true })
  description?: string;

  @Property()
  section?: string;

  @Property({ length: 6 })
  code?: string;

  @Property({ type: 'varchar' })
  ownerId!: string;

  @Property({ default: false })
  archived: boolean = false;

  @Property()
  createdAt: Date = new Date();

  @Property({ onUpdate: () => new Date() })
  updatedAt: Date = new Date();

  @OneToMany(() => Post, (post) => post.class)
  posts = new Collection<Post>(this);

  @OneToMany(() => Student, (student) => student.class)
  students = new Collection<Student>(this);

  [EntityRepositoryType]?: ClassRepository;
}
