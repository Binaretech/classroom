export enum ClassMemberType {
  Teacher = 'TEACHER',
  Student = 'STUDENT',
}

export type Member = {
  userId: string;
  classId: number;
  type: ClassMemberType;
  user: User;
};
