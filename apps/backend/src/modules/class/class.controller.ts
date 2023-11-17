import {
  Controller,
  Get,
  Post,
  Query,
  Request,
  UseGuards,
} from '@nestjs/common';
import { ClassService } from './class.service';
import { CreateClassDTO } from './dto/create-class.dto';
import { ApiTags } from '@nestjs/swagger';
import { FirebaseGuard } from 'src/guards/firebase/firebase.guard';

@ApiTags('Class')
@UseGuards(FirebaseGuard)
@Controller('class')
export class ClassController {
  constructor(private readonly classService: ClassService) {}

  @Get()
  list(@Request() req: AuthRequest, @Query('page') page: number) {
    const userId = req.user.id;

    return this.classService.list(userId, page);
  }

  @Post()
  create(@Request() req: AuthRequest, dto: CreateClassDTO) {
    const userId = req.user.id;

    return this.classService.create(dto, userId);
  }
}
