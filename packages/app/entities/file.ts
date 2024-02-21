export enum BucketName {
  USERS = 'users',
  CLASSES = 'classes',
}

export type File = {
  id: number;
  bucket: BucketName;
  path: string;
  mimetype: string;
  classwork: number;
  post: number;
  url: string;
};
