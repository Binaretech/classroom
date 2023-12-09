import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreatePostDTO {
  @ApiProperty()
  @IsNotEmpty({ message: 'validation.required' })
  content!: string;
}
