import {
  IsNotEmpty,
  IsString,
  MinLength,
  MaxLength,
  Matches,
  IsOptional,
} from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreateUserDto {
  @ApiProperty({ example: "john_doe", description: "Username" })
  @IsNotEmpty()
  @IsString()
  @MinLength(4)
  @MaxLength(10)
  @Matches(/^[a-zA-Z0-9_]+$/, {
    message: "Username can only contain letters, numbers and underscores",
  })
  username: string;

  @ApiProperty({ example: "password", description: "Password" })
  @IsNotEmpty()
  @MinLength(5)
  password: string;

  @IsOptional()
  code: string;
}
