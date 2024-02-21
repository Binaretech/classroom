import { EntityRepository } from '@mikro-orm/postgresql';
import { File } from '../entities/file';

export default class FileRepository extends EntityRepository<File> {}
