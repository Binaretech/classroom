import { Injectable } from '@nestjs/common';
import { UpdateUserDto } from './dto/update-user.dto';
import * as admin from 'firebase-admin';
import { BucketName, StorageService } from '../storage/storage.service';

@Injectable()
export class UserService {
  constructor(private readonly storageService: StorageService) {}

  async update(
    userId: string,
    dto: UpdateUserDto & { image?: Express.Multer.File },
  ) {
    const url = await this.storageService.uploadFile(
      BucketName.USERS,
      dto.image,
      userId,
    );

    const record = await admin.auth().updateUser(userId, {
      displayName: dto.displayName,
      photoURL: url,
    });

    return record;
  }
}
