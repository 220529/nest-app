import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsEmail,
  Length,
} from 'class-validator';

export class CreateUserDto {
  // OpenID
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  readonly openid: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  readonly session_key: string;

  // AppID
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  readonly appid?: string;

  // 昵称
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  readonly nickName: string;

  // 性别
  @ApiProperty()
  @IsOptional()
  readonly gender?: number; // 假设性别是数字，使用可选属性

  // 头像
  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  readonly avatar: string; // 使用可选属性
}

export class CreateWechatDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  readonly code: string;
}
