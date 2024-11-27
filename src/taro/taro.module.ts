import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { TaroService } from './taro.service';
import { TaroController } from './taro.controller';

@Module({
  imports: [HttpModule],
  controllers: [TaroController],
  providers: [TaroService],
})
export class TaroModule {}
