import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsInt, IsNotEmpty } from 'class-validator';

export class CreateCatDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  readonly name: string;

  @IsInt()
  @IsNotEmpty()
  @ApiProperty()
  readonly age: number;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  readonly breed: string;
}
