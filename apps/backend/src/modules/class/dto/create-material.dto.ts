import { ApiProperty } from '@nestjs/swagger';

export default class CreateMaterialDTO {
  @ApiProperty()
  title?: string;

  @ApiProperty()
  description?: string;
}
