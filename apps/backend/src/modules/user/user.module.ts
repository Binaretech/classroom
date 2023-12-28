import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { StorageModule } from '../storage/storage.module';

@Module({
  providers: [UserService],
  controllers: [UserController],
  imports: [StorageModule],
})
export class UserModule {}
