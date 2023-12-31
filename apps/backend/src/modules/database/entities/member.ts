import { Entity, EntityRepositoryType, Property } from '@mikro-orm/core';
import MemberRepository from '../repository/member.repository';

export enum ClassMemberType {
  Teacher = 'TEACHER',
  Student = 'STUDENT',
}

@Entity({
  expression: `
  SELECT * FROM (
    SELECT owner_id as user_id, class.id as class_id, 'TEACHER' as type  from class
    union
    SELECT user_id, class_id, 'STUDENT' as type from student
  ) as members
  `,
  customRepository: () => MemberRepository,
})
export class Member {
  @Property()
  userId: string;

  @Property()
  classId: number;

  @Property()
  type: ClassMemberType;

  @Property({ persist: false })
  user: User;

  [EntityRepositoryType]?: MemberRepository;
}
