import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional, IsNotEmpty } from 'class-validator';

export class CreateMonitorDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  readonly type: string;

  // 内容
  @ApiProperty({ required: false })
  @IsOptional()
  readonly content: { [key: string]: any };
}
