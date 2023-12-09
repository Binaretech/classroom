import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateClassDTO {
  @ApiProperty()
  @IsNotEmpty({ message: 'validation.required' })
  name!: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'validation.required' })
  description?: string;

  @ApiProperty()
  section?: string;
}
