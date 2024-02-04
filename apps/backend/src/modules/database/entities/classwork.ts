import { Entity, PrimaryKey, Property, ManyToOne, Enum } from '@mikro-orm/core';
import { Class } from './class';

export enum ClassworkType {
  Material = 'Material',
  Assignment = 'Assignment',
}

@Entity()
export class Classwork {
  @PrimaryKey()
  id: number;

  @Property()
  title: string;

  @Property()
  description: string;

  @Enum(() => ClassworkType)
  type: ClassworkType;

  @ManyToOne(() => Class)
  class: Class;
}
