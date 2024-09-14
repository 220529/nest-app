import * as fs from 'fs';
import * as path from 'path';
import { ApiTags } from '@nestjs/swagger';
import { Controller, Get, Query, Res } from '@nestjs/common';
import { Response } from 'express'; // 从 express 导入 Response
import { MonitorService } from './monitor.service';
import { CreateMonitorDto } from './dto/create-monitor.dto';
import { UpdateMonitorDto } from './dto/update-monitor.dto';

@ApiTags('monitor')
@Controller('monitor')
export class MonitorController {
  constructor(private readonly monitorService: MonitorService) {}

  @Get()
  findAll() {
    return this.monitorService.findAll();
  }

  @Get('collect.gif')
  captureError(@Query() query: any, @Res() res: Response) {
    const { type, ...content } = query; // 解构赋值，抽离 type 字段
    this.monitorService.create({ type, content });
    const gifPath = path.join(process.cwd(), 'public', 'collect.gif'); // 假设已存在
    const gifBuffer = fs.readFileSync(gifPath);
    res.setHeader('Content-Type', 'image/gif'); // 使用 setHeader
    res.send(gifBuffer);
  }
}
