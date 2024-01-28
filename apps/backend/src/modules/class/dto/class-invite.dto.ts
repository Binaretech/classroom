import { ApiProperty } from '@nestjs/swagger';
import { IsEmail } from 'class-validator';

export class ClassInviteDto {
  @ApiProperty()
  @IsEmail()
  email: string;
}
