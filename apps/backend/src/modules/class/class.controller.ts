import { Controller, Post, Request, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ClassService } from './class.service';
import { CreateClassDTO } from './dto/create-class.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Class')
@Controller('class')
@UseGuards(AuthGuard('firebase-jwt'))
export class ClassController {
  constructor(private readonly classService: ClassService) {}

  @Post()
  create(@Request() req: AuthRequest, dto: CreateClassDTO) {
    const userId = req.user.id;

    return this.classService.create(dto, userId);
  }
}
