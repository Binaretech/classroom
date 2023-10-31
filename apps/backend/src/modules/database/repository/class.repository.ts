import { EntityRepository } from '@mikro-orm/postgresql';
import { Class } from '../entities/class';

export class ClassRepository extends EntityRepository<Class> {}
