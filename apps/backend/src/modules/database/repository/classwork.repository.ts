import { EntityRepository } from '@mikro-orm/postgresql';
import { Classwork } from '../entities/classwork';

export default class ClassworkRepository extends EntityRepository<Classwork> {}
