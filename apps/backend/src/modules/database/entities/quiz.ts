import { Entity, PrimaryKey, Property, ManyToOne } from '@mikro-orm/core';
import { Classwork } from './classwork';

@Entity()
export class Quiz {
  @PrimaryKey()
  id: number;

  @Property()
  title: string;

  @Property()
  description: string;

  @Property()
  dueDate?: Date;

  @Property()
  maxAttempts: number;

  @Property()
  timeLimit: number;

  @ManyToOne(() => Classwork)
  classwork: Classwork;
}
