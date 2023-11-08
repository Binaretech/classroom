import { Module } from '@nestjs/common';
import { ClassService } from './class.service';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Class } from '../database/entities/class';
import { ClassController } from './class.controller';

@Module({
  providers: [ClassService],
  imports: [MikroOrmModule.forFeature([Class])],
  controllers: [ClassController],
})
export class ClassModule {}
