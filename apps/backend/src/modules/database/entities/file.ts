import { Entity, ManyToOne, PrimaryKey, Property } from '@mikro-orm/core';
import { Classwork } from './classwork';
import { Post } from './post';

@Entity()
export class File {
  constructor(data: Partial<File>) {
    Object.assign(this, data);
  }

  @PrimaryKey()
  id!: number;

  @Property()
  path!: string;

  @Property()
  mimetype!: string;

  @ManyToOne(() => Classwork)
  classwork?: Classwork;

  @ManyToOne(() => Post)
  post?: Post;
}
