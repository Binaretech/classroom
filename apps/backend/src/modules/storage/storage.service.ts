import { Injectable } from '@nestjs/common';
import * as minio from 'minio';
import * as mime from 'mime-types';
import { ConfigService } from '@nestjs/config';

export enum BucketName {
  USERS = 'users',
  CLASSES = 'classes',
}

type StoreResult = {
  path: string;
  mimetype: string;
};

@Injectable()
export class StorageService {
  private readonly client: minio.Client;

  constructor(configService: ConfigService) {
    this.client = new minio.Client({
      endPoint: 'minio',
      port: 9000,
      useSSL: false,
      accessKey: configService.get('storage.accessKey'),
      secretKey: configService.get('storage.secretKey'),
    });
  }

  async store(
    bucketName: BucketName,
    file: Express.Multer.File,
    filename: string,
  ): Promise<StoreResult> {
    const { buffer, mimetype, size, originalname } = file;

    const ext = originalname.split('.').pop() || mime.extension(mimetype);
    const newFilename = `${filename}.${ext}`;

    await new Promise((resolve, reject) => {
      this.client.putObject(
        bucketName,
        newFilename,
        buffer,
        size,
        {
          'Content-Type': mimetype.replace('jpeg', 'jpg'),
        },
        (err, obj) => {
          if (err) {
            reject(err);
          } else {
            resolve(obj);
          }
        },
      );
    });

    return { path: `${bucketName}/${newFilename}`, mimetype };
  }

  async storeMany(
    bucketName: BucketName,
    files: Express.Multer.File[],
    folderName: string,
  ): Promise<StoreResult[]> {
    const results = await Promise.all(
      files.map((file) =>
        this.store(bucketName, file, `${folderName}/${file.originalname}`),
      ),
    );

    return results;
  }

  async delete(bucketName: BucketName, filename: string) {
    await this.client.removeObject(bucketName, filename);
  }
}
