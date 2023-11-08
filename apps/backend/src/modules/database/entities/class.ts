import {
  Entity,
  EntityRepositoryType,
  PrimaryKey,
  Property,
} from '@mikro-orm/core';
import ClassRepository from '../repository/class.repository';

@Entity({ customRepository: () => ClassRepository })
export class Class {
  @PrimaryKey({ type: 'bigint', autoincrement: true })
  id!: number;

  @Property({ length: 64 })
  name!: string;

  @Property({ length: 255, nullable: true })
  description?: string;

  @Property()
  ownerId!: string;

  @Property({ default: false })
  archived: boolean = false;

  @Property()
  createdAt: Date = new Date();

  @Property({ onUpdate: () => new Date() })
  updatedAt: Date = new Date();

  [EntityRepositoryType]?: ClassRepository;
}
