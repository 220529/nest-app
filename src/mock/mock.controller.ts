import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import * as Mock from 'mockjs';
import { ApiTags } from '@nestjs/swagger';
import { Public } from '@/decorators/public.decorator';
import { MockService } from './mock.service';
import { CreateMockDto } from './dto/create-mock.dto';
import { UpdateMockDto } from './dto/update-mock.dto';

@ApiTags('mock')
@Controller('mock')
@Public()
export class MockController {
  constructor(private readonly mockService: MockService) { }

  @Get('data')
  getMockData() {
    return {
      id: 1,
      name: 'Mock User',
      email: 'mockuser@example.com',
    };
  }

  @Get('pagination')
  getPaginatedData(
    @Query('page') page: number = 1,
    @Query('size') size: number = 10,
  ) {
    // 总数据量
    const totalItems = 23;

    // 使用 Mock.js 动态生成数据
    const items = Mock.mock({
      [`data|${totalItems}`]: [
        {
          serialNumber: '@increment(1)', // 自动递增的序列号
          modificationType:
            '@pick(["客户电话", "客户地址", "客户姓名", "订单状态"])', // 随机选择修改类型
          modificationDetails: '@sentence(5, 10)', // 生成修改细节描述
          orderStatus: '@pick(["报价中", "处理中", "已完成", "已取消"])', // 随机选择订单状态
          modificationReason: '@pick(["无", "客户要求", "信息错误"])', // 随机选择修改原因
          operator: '@cname', // 随机生成操作员的中文名字
          modificationTime: '@datetime("yyyy-MM-dd HH:mm:ss")', // 随机生成修改时间
        },
      ],
    }).data;

    // 分页逻辑
    const startIndex = (page - 1) * size; // 计算当前页开始的数据索引
    const endIndex = Number(startIndex) + Number(size); // 计算当前页结束的数据索引
    const paginatedItems = items.slice(startIndex, endIndex); // 切片获取当前页的数据

    console.log("page", page, size, startIndex, endIndex);

    return {
      page,
      size,
      totalItems,
      totalPages: Math.ceil(totalItems / size),
      data: paginatedItems, // 返回当前页的数据
    };
  }

  @Post()
  create(@Body() createMockDto: CreateMockDto) {
    return this.mockService.create(createMockDto);
  }

  @Get()
  findAll() {
    return this.mockService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.mockService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMockDto: UpdateMockDto) {
    return this.mockService.update(+id, updateMockDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.mockService.remove(+id);
  }
}
