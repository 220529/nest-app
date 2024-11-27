import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { TaroService } from './taro.service';
import { CreateTaroDto } from './dto/create-taro.dto';
import { UpdateTaroDto } from './dto/update-taro.dto';

@Controller('taro')
export class TaroController {
  constructor(private readonly taroService: TaroService) {}

  @Post()
  create(@Body() createTaroDto: CreateTaroDto) {
    console.log('createTaroDto', createTaroDto);

    return this.taroService.login(createTaroDto.code);
  }

  @Get()
  findAll() {
    return this.taroService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.taroService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTaroDto: UpdateTaroDto) {
    return this.taroService.update(+id, updateTaroDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.taroService.remove(+id);
  }
}
