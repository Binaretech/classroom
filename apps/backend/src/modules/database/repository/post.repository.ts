import { EntityRepository } from '@mikro-orm/postgresql';
import { Post } from '../entities/post';

export default class PostRepository extends EntityRepository<Post> {
  async insert(data: Pick<Post, 'content' | 'author' | 'class'>) {
    const record = new Post(data);

    await this.em.persistAndFlush(record);

    return record;
  }
}
