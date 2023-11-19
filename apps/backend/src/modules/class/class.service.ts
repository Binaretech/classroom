import { Injectable } from '@nestjs/common';
import ClassRepository from '../database/repository/class.repository';
import { CreateClassDTO } from './dto/create-class.dto';

@Injectable()
export class ClassService {
  constructor(private readonly classRepository: ClassRepository) {}

  async list(userId: string, page: number = 1, limit: number = 10) {
    const offset = (page - 1) * limit;
    const [classes, count] = await this.classRepository.findAndCount(
      {
        ownerId: userId,
      },
      {
        limit: limit,
        offset: offset,
      },
    );
    return { classes, count };
  }

  create(request: CreateClassDTO, userId: string) {
    return this.classRepository.insert({
      name: request.name,
      description: request.description,
      ownerId: userId,
    });
  }
}
