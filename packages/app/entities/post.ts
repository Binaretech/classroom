import { Class } from './class';

export type Post = {
  id: number;
  content: string;
  author: User;
  createdAt: Date;
  updatedAt: Date;
  class?: Class;
};
