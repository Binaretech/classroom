import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export default class JoinClassDTO {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  code: string;
}
