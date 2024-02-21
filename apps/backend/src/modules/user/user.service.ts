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

  async findByEmail(email: string) {
    const user = await admin
      .auth()
      .getUserByEmail(email)
      .catch(() => null);

    return user;
  }

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

  async getUserMap(ids: { uid: string }[]) {
    const users = await admin.auth().getUsers(ids);

    const userMap = users.users.reduce((acc, user) => {
      acc[user.uid] = {
        uid: user.uid,
        displayName: user.displayName,
        photoURL: user.photoURL,
        email: user.email,
      };

      return acc;
    }, {});

    return userMap;
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

      await this.storageService.delete(BucketName.USERS, path);

      return null;
    }

    const { path } = await this.storageService.store(
      BucketName.USERS,
      image,
      userId,
    );

    const url = this.configService.get('storage.url');

    return `${url}/${BucketName.USERS}/${path}`;
  }
}
