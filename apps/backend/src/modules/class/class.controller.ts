import {
  Body,
  Controller,
  ForbiddenException,
  Get,
  Param,
  Post,
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

@ApiTags('Class')
@UseGuards(FirebaseGuard)
@ApiBearerAuth()
@Controller('class')
export class ClassController {
  constructor(private readonly classService: ClassService) {}

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
  get(@User() user: User, @Param('id') id: number) {
    return this.classService.get(id, user.uid);
  }

  @Post()
  create(@User() user: User, @Body() dto: CreateClassDTO) {
    return this.classService.create(dto, user.uid);
  }

  @Post('join')
  join(@User() user: User, @Body() dto: JoinClassDTO) {
    return this.classService.join(dto, user.uid);
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
    const isMember = await this.classService.isClassMember(id, user.uid);

    if (!isMember) {
      throw new ForbiddenException();
    }

    return this.classService.getMembers(id, page, limit);
  }
}
