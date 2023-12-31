export enum ClassMemberType {
  Teacher = 'teacher',
  Student = 'student',
}

export class ClassMember {
  id: string;
  type: ClassMemberType;
  displayName: string;
  email: string;
  photoURL: string;
}
