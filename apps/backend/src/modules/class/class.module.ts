import { Module } from '@nestjs/common';
import { ClassService } from './class.service';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Class } from '../database/entities/class';
import { ClassController } from './class.controller';
import { Post } from '../database/entities/post';
import { Student } from '../database/entities/student';
import { Member } from '../database/entities/member';

@Module({
  providers: [ClassService],
  imports: [MikroOrmModule.forFeature([Class, Post, Student, Member])],
  controllers: [ClassController],
})
export class ClassModule {}
