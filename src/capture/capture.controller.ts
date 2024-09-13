import * as fs from 'fs';
import * as path from 'path';
import { Controller, Get, Query, Res } from '@nestjs/common';
import { Response } from 'express'; // 从 express 导入 Response
import { ApiTags } from '@nestjs/swagger';
import { CaptureService } from './capture.service';

@ApiTags('capture')
@Controller('capture')
export class CaptureController {
  constructor(private readonly captureService: CaptureService) {}

  @Get('collect.gif')
  captureError(@Query() query: any, @Res() res: Response) {
    this.captureService.create(query);
    const gifPath = path.join(process.cwd(), 'public', 'collect.gif'); // 假设已存在
    const gifBuffer = fs.readFileSync(gifPath);
    res.setHeader('Content-Type', 'image/gif'); // 使用 setHeader
    res.send(gifBuffer);
  }
}
