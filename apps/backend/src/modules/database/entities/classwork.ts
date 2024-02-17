import {
  Entity,
  PrimaryKey,
  Property,
  ManyToOne,
  Enum,
  EntityRepositoryType,
  OneToMany,
  Collection,
} from '@mikro-orm/core';
import { Class } from './class';
import ClassworkRepository from '../repository/classwork.repository';
import { File } from './file';

export enum ClassworkType {
  Material = 'Material',
  Assignment = 'Assignment',
}

@Entity({ customRepository: () => ClassworkRepository })
export class Classwork {
  constructor(data: Partial<Classwork>) {
    Object.assign(this, data);
  }

  @PrimaryKey()
  id: number;

  @Property()
  title?: string;

  @Property()
  description?: string;

  @Enum(() => ClassworkType)
  type: ClassworkType;

  @ManyToOne(() => Class)
  class: Class;

  @OneToMany(() => File, (file) => file.classwork)
  attachments = new Collection<File>(this);

  [EntityRepositoryType]?: ClassworkRepository;
}
