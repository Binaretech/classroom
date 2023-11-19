import { EntityRepository } from '@mikro-orm/postgresql';
import { Class } from '../entities/class';

export default class ClassRepository extends EntityRepository<Class> {
  findById(id: number) {
    this.findOne(id);
  }

  async insert(cls: Pick<Class, 'name' | 'description' | 'ownerId' | 'code'>) {
    const record = new Class();

    record.name = cls.name;
    record.description = cls.description;
    record.ownerId = cls.ownerId;
    record.code = cls.code;

    await this.em.persistAndFlush(record);

    return record;
  }
}
