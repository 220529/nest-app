import { IsString, MaxLength } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class UpdateProfileDto {
  @ApiProperty()
  @IsString()
  @MaxLength(200)
  avatar?: string;

  @ApiProperty()
  @IsString()
  @MaxLength(200)
  address?: string;
}
