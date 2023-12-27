import {
  Entity,
  EntityRepositoryType,
  ManyToOne,
  PrimaryKey,
  Property,
} from '@mikro-orm/core';
import { Class } from './class';
import StudentRepository from '../repository/student.repository';

@Entity({ customRepository: () => StudentRepository })
export class Student {
  constructor(data: Partial<Student>) {
    Object.assign(this, data);
  }

  @PrimaryKey({ type: 'bigint', autoincrement: true })
  id!: number;

  @Property({ length: 64 })
  userId!: string;

  @ManyToOne()
  class!: Class;

  [EntityRepositoryType]?: StudentRepository;
}
