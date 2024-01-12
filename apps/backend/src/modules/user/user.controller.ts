import {
  Body,
  Controller,
  Put,
  Request,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { FirebaseGuard } from 'src/guards/firebase/firebase.guard';
import { UpdateUserDto } from './dto/update-user.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { UserService } from './user.service';

@ApiTags('User')
@UseGuards(FirebaseGuard)
@ApiBearerAuth()
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Put()
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        profileImage: {
          type: 'string',
          format: 'binary',
        },
        displayName: {
          type: 'string',
        },
      },
    },
  })
  @UseInterceptors(FileInterceptor('profileImage'))
  async update(
    @Request() req: AuthRequest,
    @Body() dto: UpdateUserDto,
    @UploadedFile() profileImage: any,
  ) {
    const userId = req.user.uid;
    const record = await this.userService.update(userId, {
      ...dto,
      image: profileImage,
    });

    return record;
  }
}
