import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateMonitorDto } from './dto/create-monitor.dto';
import { Monitor } from './schemas/monitor.schema';

@Injectable()
export class MonitorService {
  constructor(
    @InjectModel(Monitor.name) private readonly monitorModel: Model<Monitor>,
  ) {}

  async create(createCatDto: CreateMonitorDto): Promise<Monitor> {
    const createdCat = await this.monitorModel.create(createCatDto);
    return createdCat;
  }

  async findAll(): Promise<Monitor[]> {
    return this.monitorModel.find().exec();
  }
}
