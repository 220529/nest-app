import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class CaptureService {
  private logDir = path.join(process.cwd(), 'logs');

  constructor() {
    if (!fs.existsSync(this.logDir)) {
      fs.mkdirSync(this.logDir, { recursive: true });
    }
  }

  create(errorData: any) {
    const logFile = path.join(this.logDir, this.getLogFileName());
    const timestamp = this.formatDate(new Date()); // 使用自定义格式化函数
    const formattedError = JSON.stringify(errorData, null, 2); // 格式化为 JSON 字符串

    const logEntry = `${timestamp} - ${formattedError}\n`;

    fs.appendFileSync(logFile, logEntry, { encoding: 'utf8' });

    // 清理过期的日志文件
    this.cleanOldLogs();
  }

  private formatDate(date: Date): string {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // 月份从0开始，+1
    const day = date.getDate().toString().padStart(2, '0');
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const seconds = date.getSeconds().toString().padStart(2, '0');
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  }

  private getLogFileName(): string {
    const today = new Date();
    const year = today.getFullYear();
    const month = (today.getMonth() + 1).toString().padStart(2, '0'); // 月份从0开始，+1
    const day = today.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}.log`;
  }

  private cleanOldLogs() {
    const files = fs.readdirSync(this.logDir);
    const now = Date.now();
    const daysToKeep = 3;
    const maxAge = daysToKeep * 24 * 60 * 60 * 1000;

    files.forEach((file) => {
      const filePath = path.join(this.logDir, file);
      const stats = fs.statSync(filePath);
      if (now - stats.mtimeMs > maxAge) {
        fs.unlinkSync(filePath);
      }
    });
  }
}
