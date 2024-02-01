import { EntityRepository } from '@mikro-orm/postgresql';
import { Class } from '../entities/class';
import { customAlphabet } from 'nanoid';

export default class ClassRepository extends EntityRepository<Class> {
  findById(id: number) {
    this.findOne(id);
  }

  async insert(
    data: Pick<Class, 'name' | 'description' | 'section' | 'ownerId'>,
  ) {
    const record = new Class(data);

    await this.em.persistAndFlush(record);

    return record;
  }

  async generateCode() {
    const nanoid = customAlphabet(
      '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz',
      7,
    );

    for (let i = 0; i < 5; i++) {
      const code = nanoid();

      const exists = await this.findOne({ code });

      if (!exists) {
        return code;
      }
    }

    return this.generateCode();
  }
}
