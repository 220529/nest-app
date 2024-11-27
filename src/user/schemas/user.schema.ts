import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

/**
 * 定义用户模式
 * 未定义的字段，存不进去
 */
@Schema({ timestamps: true })
export class User extends Document {
  @Prop()
  openid: string;

  @Prop()
  session_key: string;

  @Prop()
  appid: string;

  // 昵称
  @Prop()
  nickName: string;

  // 性别
  @Prop()
  gender: number;

  // 头像
  @Prop()
  avatar: string;
}

// 创建 User 模型
export type UserDocument = User & Document;

// 创建用户模式
export const UserSchema = SchemaFactory.createForClass(User);
