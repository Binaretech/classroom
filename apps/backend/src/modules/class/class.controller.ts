import { Controller, Post, Request, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ClassService } from './class.service';
import { CreateClassDTO } from './dto/create-class.dto';

@Controller('class')
@UseGuards(AuthGuard('jwt'))
export class ClassController {
  constructor(private readonly classService: ClassService) {}

  @Post()
  create(@Request() req: AuthRequest, dto: CreateClassDTO) {
    const userId = req.user.id;

    return this.classService.create(dto, userId);
  }
}
