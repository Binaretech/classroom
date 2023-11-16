import { Injectable } from '@nestjs/common';
import ClassRepository from '../database/repository/class.repository';
import { CreateClassDTO } from './dto/create-class.dto';

@Injectable()
export class ClassService {
  constructor(private readonly classRepository: ClassRepository) {}

  create(request: CreateClassDTO, userId: string) {
    return this.classRepository.insert({
      name: request.name,
      description: request.description,
      ownerId: userId,
    });
  }
}
