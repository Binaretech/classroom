import { Module } from '@nestjs/common';
import { ClassService } from './class.service';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Class } from '../database/entities/class';

@Module({
  providers: [ClassService],
  imports: [MikroOrmModule.forFeature([Class])],
})
export class ClassModule {}
