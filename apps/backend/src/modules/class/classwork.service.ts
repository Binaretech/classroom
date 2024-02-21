import { Injectable } from '@nestjs/common';
import CreateMaterialDTO from './dto/create-material.dto';
import { BucketName, StorageService } from '../storage/storage.service';
import { File } from '../database/entities/file';
import { Classwork, ClassworkType } from '../database/entities/classwork';
import ClassworkRepository from '../database/repository/classwork.repository';
import ClassRepository from '../database/repository/class.repository';
import { UserService } from '../user/user.service';

@Injectable()
export class ClassworkService {
  constructor(
    private readonly classworkRepository: ClassworkRepository,
    private readonly storageService: StorageService,
    private readonly classRepository: ClassRepository,
    private readonly userService: UserService,
  ) {}

  async getSingleClassworkByClassIdAndId(
    classId: number,
    id: number,
  ): Promise<Classwork> {
    return this.classworkRepository.findOneOrFail(
      { id, class: classId },
      { populate: ['attachments'] },
    );
  }

  async getForClass(
    classId: number,
    page: number = 1,
    limit: number = 10,
  ): Promise<{ classworks: Classwork[]; count: number }> {
    const offset = (page - 1) * limit;

    const [records, count] = await this.classworkRepository.findAndCount(
      { class: classId },
      {
        limit: limit,
        offset: offset,
        orderBy: { createdAt: 'DESC' },
        populate: ['attachments'],
      },
    );

    const userMap = await this.userService.getUserMap(
      records.map((classwork) => ({ uid: classwork.userId })),
    );

    const classworks = records.map((classwork) => ({
      ...classwork,
      user: userMap[classwork.userId],
    }));

    await Promise.all(
      classworks.flatMap((classwork) =>
        classwork.attachments.map((attachment) =>
          this.storageService
            .getPresignedUrl(attachment.bucket, attachment.path)
            .then((url) => {
              attachment.url = url;
            }),
        ),
      ),
    );

    return {
      classworks,
      count,
    };
  }

  async createMaterial(
    classId: number,
    userId: string,
    body: CreateMaterialDTO,
    attachments: Array<Express.Multer.File>,
  ) {
    const em = this.classRepository.getEntityManager();

    const classEntity = await this.classRepository.findOne({
      id: classId,
    });

    const results = await this.storageService.storeMany(
      BucketName.CLASSES,
      attachments,
      `class/${classId}/materials`,
    );

    const classwork = this.classworkRepository.create({
      title: body.title,
      description: body.description,
      type: ClassworkType.Material,
      class: classEntity,
      userId,
    });

    const files = results.map(
      (result) =>
        new File({
          bucket: BucketName.CLASSES,
          path: result.path,
          mimetype: result.mimetype,
        }),
    );

    classwork.attachments.add(files);

    await em.flush();

    return classwork;
  }
}
