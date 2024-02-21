import { Entity, ManyToOne, PrimaryKey, Property } from '@mikro-orm/core';
import { Classwork } from './classwork';
import { Post } from './post';
import { BucketName } from 'src/modules/storage/storage.service';
import FileRepository from '../repository/file.repository';

@Entity({ customRepository: () => FileRepository })
export class File {
  constructor(data: Partial<File>) {
    Object.assign(this, data);
  }

  @PrimaryKey()
  id!: number;

  @Property()
  bucket!: BucketName;

  @Property()
  path!: string;

  @Property()
  mimetype!: string;

  @Property({ persist: false })
  url: string;

  @ManyToOne(() => Classwork)
  classwork?: Classwork;

  @ManyToOne(() => Post)
  post?: Post;
}
