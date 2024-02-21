import { Injectable } from '@nestjs/common';
import * as minio from 'minio';
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
  private readonly publicHost: string;

  constructor(configService: ConfigService) {
    this.client = new minio.Client({
      endPoint: 'minio',
      port: 9000,
      useSSL: false,
      accessKey: configService.get('storage.accessKey'),
      secretKey: configService.get('storage.secretKey'),
    });

    this.publicHost = configService.get('storage.publicHost');
  }

  async get(bucketName: BucketName, filename: string) {
    const file = await this.client.getObject(bucketName, filename);
    return file;
  }

  async getPresignedUrl(bucketName: BucketName, filename: string) {
    const url = await this.client.presignedUrl(
      'GET',
      bucketName,
      filename,
      24 * 60 * 60,
    );

    const parsedUrl = new URL(url);

    parsedUrl.host = this.publicHost;
    parsedUrl.port = '80';

    return parsedUrl.toString();
  }

  async store(
    bucketName: BucketName,
    file: Express.Multer.File,
    filename: string,
  ): Promise<StoreResult> {
    const { buffer, mimetype, size } = file;

    await new Promise((resolve, reject) => {
      this.client.putObject(
        bucketName,
        filename,
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

    return { path: filename, mimetype };
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
