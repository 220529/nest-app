import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MonitorService } from './monitor.service';
import { MonitorController } from './monitor.controller';
import { MonitorSchema, Monitor } from './schemas/monitor.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Monitor.name, schema: MonitorSchema }]),
  ],
  controllers: [MonitorController],
  providers: [MonitorService],
})
export class MonitorModule {}
