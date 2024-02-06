import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  ForbiddenException,
  Get,
  HttpCode,
  HttpStatus,
  NotFoundException,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ClassService } from './class.service';
import { CreateClassDTO } from './dto/create-class.dto';
import { ApiBearerAuth, ApiParam, ApiQuery, ApiTags } from '@nestjs/swagger';
import { FirebaseGuard } from 'src/guards/firebase/firebase.guard';
import JoinClassDTO from './dto/join-class.dto';
import { CreatePostDTO } from './dto/create-post.dto';
import { User } from 'src/decorators/user.decorator';
import { ClassInviteDto } from './dto/class-invite.dto';
import { EmailService } from '../email/email.service';

@ApiTags('Class')
@UseGuards(FirebaseGuard)
@ApiBearerAuth()
@Controller('class')
export class ClassController {
  constructor(
    private readonly classService: ClassService,
    private readonly emailService: EmailService,
  ) {}

  @Get()
  @ApiQuery({ name: 'page', required: false, example: 1 })
  @ApiQuery({ name: 'limit', required: false, example: 10 })
  list(
    @User() user: User,
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
  ) {
    return this.classService.list(user.uid, page, limit);
  }

  @Get(':id')
  @ApiParam({ name: 'id', required: true, example: 1 })
  async get(@User() user: User, @Param('id') id: number) {
    const exists = await this.classService.exists(id);
    if (!exists) {
      throw new NotFoundException('errors.notFound');
    }

    const isMember = await this.classService.isClassMember(id, user.uid);

    if (!isMember) {
      throw new ForbiddenException('errors.forbidden');
    }

    return this.classService.get(id);
  }

  @Post()
  create(@User() user: User, @Body() dto: CreateClassDTO) {
    return this.classService.create(dto, user.uid);
  }

  @Put(':id')
  @ApiParam({ name: 'id', required: true, example: 1 })
  async update(
    @User() user: User,
    @Param('id') id: number,
    @Body() dto: Partial<CreateClassDTO>,
  ) {
    const exists = await this.classService.exists(id);
    if (!exists) {
      throw new NotFoundException('errors.notFound');
    }

    const isClassOwner = await this.classService.isClassOwner(id, user.uid);

    if (!isClassOwner) {
      throw new ForbiddenException();
    }

    return this.classService.update(id, dto);
  }

  @Post('join')
  join(@User() user: User, @Body() dto: JoinClassDTO) {
    return this.classService.join(dto, user.uid);
  }

  @Post(':id/leave')
  @HttpCode(HttpStatus.OK)
  @ApiParam({ name: 'id', required: true, example: 1 })
  async leave(@User() user: User, @Param('id') id: number) {
    const exists = await this.classService.exists(id);
    if (!exists) {
      throw new NotFoundException('errors.notFound');
    }

    const isMember = await this.classService.isClassMember(id, user.uid);

    if (!isMember) {
      throw new ForbiddenException();
    }

    return this.classService.leave(id, user.uid);
  }

  @Get(':id/posts')
  @ApiParam({ name: 'id', required: true, example: 1 })
  @ApiQuery({ name: 'page', required: false, example: 1 })
  @ApiQuery({ name: 'limit', required: false, example: 10 })
  async getPosts(
    @User() user: User,
    @Param('id') id: number,
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
  ) {
    const exists = await this.classService.exists(id);
    if (!exists) {
      throw new NotFoundException('errors.notFound');
    }

    const isMember = await this.classService.isClassMember(id, user.uid);

    if (!isMember) {
      throw new ForbiddenException();
    }

    return this.classService.getPosts(id, page, limit);
  }

  @Post(':id/posts')
  @ApiParam({ name: 'id', required: true, example: 1 })
  async createPost(
    @User() user: User,
    @Param('id') id: number,
    @Body() body: CreatePostDTO,
  ) {
    const isMember = await this.classService.isClassMember(id, user.uid);

    if (!isMember) {
      throw new ForbiddenException();
    }

    return this.classService.createPost(id, user.uid, body.content);
  }

  @Get(':id/members')
  @ApiParam({ name: 'id', required: true, example: 1 })
  @ApiQuery({ name: 'page', required: false, example: 1 })
  @ApiQuery({ name: 'limit', required: false, example: 10 })
  async getMembers(
    @User() user: User,
    @Param('id') id: number,
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
  ) {
    const exists = await this.classService.exists(id);
    if (!exists) {
      throw new NotFoundException('errors.notFound');
    }

    const isMember = await this.classService.isClassMember(id, user.uid);

    if (!isMember) {
      throw new ForbiddenException();
    }

    return this.classService.getMembers(id, page, limit);
  }

  @Post(':id/reset-code')
  @HttpCode(HttpStatus.OK)
  @ApiParam({ name: 'id', required: true, example: 1 })
  async resetCode(@User() user: User, @Param('id') id: number) {
    const exists = await this.classService.exists(id);
    if (!exists) {
      throw new NotFoundException('errors.notFound');
    }

    const isClassOwner = await this.classService.isClassOwner(id, user.uid);

    if (!isClassOwner) {
      throw new ForbiddenException();
    }

    return this.classService.resetCode(id);
  }

  @Post(':id/delete-code')
  @HttpCode(HttpStatus.OK)
  @ApiParam({ name: 'id', required: true, example: 1 })
  async deleteCode(@User() user: User, @Param('id') id: number) {
    const exists = await this.classService.exists(id);
    if (!exists) {
      throw new NotFoundException('errors.notFound');
    }

    const isClassOwner = await this.classService.isClassOwner(id, user.uid);

    if (!isClassOwner) {
      throw new ForbiddenException();
    }

    return this.classService.deleteCode(id);
  }

  @Post(':id/invite')
  @HttpCode(HttpStatus.OK)
  @ApiParam({ name: 'id', required: true, example: 1 })
  async invite(
    @User() user: User,
    @Param('id') id: number,
    @Body() { email }: ClassInviteDto,
  ) {
    const exists = await this.classService.exists(id);
    if (!exists) {
      throw new NotFoundException('errors.notFound');
    }

    const isClassOwner = await this.classService.isClassOwner(id, user.uid);

    if (!isClassOwner) {
      throw new ForbiddenException('errors.forbidden');
    }

    const isMember = await this.classService.canSendInvitation(id, email);

    if (!isMember) {
      throw new BadRequestException('errors.alreadyMember');
    }

    const isAlreadyInvited = await this.classService.isAlreadyInvited(
      id,
      email,
    );

    if (isAlreadyInvited) {
      throw new BadRequestException('errors.alreadyInvited');
    }

    const code = await this.classService.invite(id, email);

    this.emailService.sendEmail(email, 'Invitation', 'classInvite', {
      code,
      classId: id,
    });

    return { success: true };
  }

  @Post(':id/join')
  @HttpCode(HttpStatus.OK)
  @ApiParam({ name: 'id', required: true, example: 1 })
  async joinInvite(
    @User() user: User,
    @Param('id') id: number,
    @Body() { code }: { code: string },
  ) {
    const isValid = await this.classService.isValidInvitation(id, code);

    if (!isValid) {
      throw new BadRequestException('errors.invalidJoinCode');
    }

    return this.classService.joinByInvitation(id, code, user.uid);
  }

  @Post(':id/archive')
  @HttpCode(HttpStatus.OK)
  @ApiParam({ name: 'id', required: true, example: 1 })
  async archive(@User() user: User, @Param('id') id: number) {
    const exists = await this.classService.exists(id);
    if (!exists) {
      throw new NotFoundException('errors.notFound');
    }

    const isClassOwner = await this.classService.isClassOwner(id, user.uid);

    if (!isClassOwner) {
      throw new ForbiddenException();
    }

    return this.classService.archive(id);
  }

  @Post(':id/unarchive')
  @HttpCode(HttpStatus.OK)
  @ApiParam({ name: 'id', required: true, example: 1 })
  async unarchive(@User() user: User, @Param('id') id: number) {
    const exists = await this.classService.exists(id);
    if (!exists) {
      throw new NotFoundException('errors.notFound');
    }

    const isClassOwner = await this.classService.isClassOwner(id, user.uid);

    if (!isClassOwner) {
      throw new ForbiddenException();
    }

    return this.classService.unarchive(id);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  @ApiParam({ name: 'id', required: true, example: 1 })
  async delete(@User() user: User, @Param('id') id: number) {
    const exists = await this.classService.exists(id);
    if (!exists) {
      throw new NotFoundException('errors.notFound');
    }

    const isClassOwner = await this.classService.isClassOwner(id, user.uid);

    if (!isClassOwner) {
      throw new ForbiddenException();
    }

    return this.classService.delete(id);
  }
}
