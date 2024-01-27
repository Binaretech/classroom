import { ApiProperty } from '@nestjs/swagger';

export enum ClassMemberType {
  Teacher = 'teacher',
  Student = 'student',
}

export class ClassMember {
  @ApiProperty()
  id: string;
  @ApiProperty()
  type: ClassMemberType;
  @ApiProperty()
  displayName: string;
  @ApiProperty()
  email: string;
  @ApiProperty()
  photoURL: string;
}
