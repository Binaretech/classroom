import { Class } from './class';

export type Post = {
  id: number;
  content: string;
  author: string;
  createdAt: Date;
  updatedAt: Date;
  class?: Class;
};
