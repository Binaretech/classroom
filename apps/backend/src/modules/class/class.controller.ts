import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  Request,
  UseGuards,
} from '@nestjs/common';
import { ClassService } from './class.service';
import { CreateClassDTO } from './dto/create-class.dto';
import { ApiBearerAuth, ApiParam, ApiQuery, ApiTags } from '@nestjs/swagger';
import { FirebaseGuard } from 'src/guards/firebase/firebase.guard';
import JoinClassDTO from './dto/join-class.dto';
import { CreatePostDTO } from './dto/create-post.dto';

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
    @Request() req: AuthRequest,
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
  ) {
    const userId = req.user.uid;

    return this.classService.list(userId, page, limit);
  }

  @Get(':id')
  @ApiParam({ name: 'id', required: true, example: 1 })
  get(@Request() req: AuthRequest, @Param('id') id: number) {
    const userId = req.user.uid;

    return this.classService.get(id, userId);
  }

  @Post()
  create(@Request() req: AuthRequest, @Body() dto: CreateClassDTO) {
    const userId = req.user.uid;

    return this.classService.create(dto, userId);
  }

  @Post('join')
  join(@Request() req: AuthRequest, @Body() dto: JoinClassDTO) {
    const userId = req.user.uid;

    return this.classService.join(dto, userId);
  }

  @Get(':id/posts')
  @ApiParam({ name: 'id', required: true, example: 1 })
  @ApiQuery({ name: 'page', required: false, example: 1 })
  @ApiQuery({ name: 'limit', required: false, example: 10 })
  getPosts(
    @Request() req: AuthRequest,
    @Param('id') id: number,
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
  ) {
    // TODO check if user is in class

    return this.classService.getPosts(id, page, limit);
  }

  @Post(':id/posts')
  @ApiParam({ name: 'id', required: true, example: 1 })
  createPost(
    @Request() req: AuthRequest,
    @Param('id') id: number,
    @Body() body: CreatePostDTO,
  ) {
    const userId = req.user.uid;

    return this.classService.createPost(id, userId, body.content);
  }
}
