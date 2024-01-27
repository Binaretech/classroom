import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsUrl } from 'class-validator';

export class ClassInviteDto {
  @ApiProperty()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsUrl({
    protocols: ['http', 'https'],
    allow_fragments: true,
    host_whitelist: ['localhost'],
  })
  callbackUrl: string;
}
