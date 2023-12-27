import { EntityRepository } from '@mikro-orm/postgresql';
import { Student } from '../entities/student';

export default class StudentRepository extends EntityRepository<Student> {
  findById(id: number) {
    this.findOne(id);
  }

  async insert(data: Pick<Student, 'userId' | 'class'>) {
    const record = new Student(data);

    await this.em.persistAndFlush(record);

    return record;
  }
}
