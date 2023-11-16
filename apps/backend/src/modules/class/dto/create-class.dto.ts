import { ApiProperty } from '@nestjs/swagger';

export class CreateClassDTO {
  @ApiProperty()
  name!: string;
  @ApiProperty()
  description?: string;
}
