import { Class } from './class';
import { File } from './file';

export enum ClassworkType {
  Material = 'Material',
  Assignment = 'Assignment',
}

export type Classwork = {
  id: number;
  title?: string;
  description?: string;
  type: ClassworkType;
  userId: string;
  user: User;
  class: Class;
  attachments: File[];
  createdAt: Date;
  updatedAt: Date;
};
