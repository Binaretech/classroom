import { Module } from '@nestjs/common';
import { ClassService } from './class.service';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Class } from '../database/entities/class';
import { ClassController } from './class.controller';
import { Post } from '../database/entities/post';
import { Student } from '../database/entities/student';
import { Member } from '../database/entities/member';
import { Invitation } from '../database/entities/invitations';
import { EmailModule } from '../email/email.module';
import { UserModule } from '../user/user.module';
import { Classwork } from '../database/entities/classwork';
import { StorageModule } from '../storage/storage.module';

@Module({
  providers: [ClassService],
  imports: [
    MikroOrmModule.forFeature([
      Class,
      Post,
      Student,
      Member,
      Invitation,
      Classwork,
    ]),
    EmailModule,
    UserModule,
    StorageModule,
  ],
  controllers: [ClassController],
})
export class ClassModule {}
