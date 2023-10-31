import { Injectable } from '@nestjs/common';
import { ClassRepository } from '../database/repository/class.repository';

@Injectable()
export class ClassService {
  constructor(private readonly classRepository: ClassRepository) {}
}
