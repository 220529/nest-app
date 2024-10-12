import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class UploadDto {
  @IsNotEmpty()
  @ApiProperty({ type: 'string', format: 'binary' })
  file: any;
}
