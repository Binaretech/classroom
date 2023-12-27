import { Module } from '@nestjs/common';
import { ClassService } from './class.service';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Class } from '../database/entities/class';
import { ClassController } from './class.controller';
import { Post } from '../database/entities/post';
import { Student } from '../database/entities/student';

@Module({
  providers: [ClassService],
  imports: [MikroOrmModule.forFeature([Class, Post, Student])],
  controllers: [ClassController],
})
export class ClassModule {}
