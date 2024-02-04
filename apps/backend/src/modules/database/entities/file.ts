import { Entity, ManyToOne, PrimaryKey, Property } from '@mikro-orm/core';
import { Classwork } from './classwork';
import { Post } from './post';

@Entity()
export class File {
  @PrimaryKey()
  id!: number;

  @Property()
  path!: string;

  @Property()
  mimetype!: string;

  @Property()
  type!: string;

  @ManyToOne(() => Classwork)
  classwork!: Classwork;

  @ManyToOne(() => Post)
  post!: Post;
}
