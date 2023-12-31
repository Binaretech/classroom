import { EntityRepository } from '@mikro-orm/postgresql';
import { Member } from '../entities/member';

export default class MemberRepository extends EntityRepository<Member> {}
