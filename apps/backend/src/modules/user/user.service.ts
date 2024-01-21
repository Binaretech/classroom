import { Injectable } from '@nestjs/common';
import { UpdateUserDto } from './dto/update-user.dto';
import * as admin from 'firebase-admin';
import { BucketName, StorageService } from '../storage/storage.service';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class UserService {
  constructor(
    private readonly storageService: StorageService,
    private readonly configService: ConfigService,
  ) {}

  async update(
    userId: string,
    dto: UpdateUserDto & { image?: Express.Multer.File },
  ) {
    const url = await this.updateProfileImage(userId, dto.image);

    const record = await admin.auth().updateUser(userId, {
      displayName: dto.displayName,
      photoURL: url,
    });

    return record;
  }

  private async updateProfileImage(userId: string, image: Express.Multer.File) {
    if (image === undefined) {
      return;
    }

    if (image === null) {
      const user = await admin.auth().getUser(userId);

      const path = user.photoURL.replace(
        `${this.configService.get('storage.url')}/`,
        '',
      );

      await this.storageService.deleteFile(BucketName.USERS, path);

      return null;
    }

    const url = await this.storageService.uploadFile(
      BucketName.USERS,
      image,
      userId,
    );

    return url;
  }
}
