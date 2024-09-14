import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type MonitorDocument = HydratedDocument<Monitor>;

@Schema({ timestamps: true })
export class Monitor {
  @Prop()
  type: string;

  // 内容，混合类型
  @Prop({ type: 'Mixed' })
  content: Record<string, any>;
}

export const MonitorSchema = SchemaFactory.createForClass(Monitor);
