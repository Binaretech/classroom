import { Injectable } from '@nestjs/common';
import ClassRepository from '../database/repository/class.repository';
import { CreateClassDTO } from './dto/create-class.dto';
import { Class } from '../database/entities/class';

@Injectable()
export class ClassService {
  constructor(private readonly classRepository: ClassRepository) {}

  create(request: CreateClassDTO, userId: string) {
    const cls: Partial<Class> = {
      name: request.name,
      description: request.description,
      archived: false,
      ownerId: userId,
    };

    return this.classRepository.insert(cls);
  }
}
