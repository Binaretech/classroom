import { Injectable } from '@nestjs/common';
import * as minio from 'minio';
import * as mime from 'mime-types';
import { ConfigService } from '@nestjs/config';

export enum BucketName {
  USERS = 'users',
}

@Injectable()
export class StorageService {
  private readonly client: minio.Client;

  constructor(private readonly configService: ConfigService) {
    this.client = new minio.Client({
      endPoint: 'minio',
      port: 9000,
      useSSL: false,
      accessKey: configService.get('storage.accessKey'),
      secretKey: configService.get('storage.secretKey'),
    });
  }

  async uploadFile(
    bucketName: BucketName,
    file: Express.Multer.File,
    filename: string,
  ): Promise<string> {
    const { buffer, mimetype } = file;

    const ext = mime.extension(mimetype);

    const newFilename = `${filename}.${ext}`;

    await new Promise((resolve, reject) => {
      this.client.putObject(bucketName, newFilename, buffer, (err, obj) => {
        if (err) {
          reject(err);
        } else {
          resolve(obj);
        }
      });
    });

    const url = this.configService.get('storage.url');

    return `${url}/users/${newFilename}`;
  }
}
