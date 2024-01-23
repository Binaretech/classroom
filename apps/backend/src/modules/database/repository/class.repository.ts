import { EntityRepository } from '@mikro-orm/postgresql';
import { Class } from '../entities/class';

export default class ClassRepository extends EntityRepository<Class> {
  findById(id: number) {
    this.findOne(id);
  }

  async insert(
    data: Pick<Class, 'name' | 'description' | 'section' | 'ownerId'>,
  ) {
    const record = new Class(data);

    record.code = this.generateCode();

    await this.em.persistAndFlush(record);

    return record;
  }

  generateCode() {
    return Math.random().toString(36).substring(7);
  }
}
