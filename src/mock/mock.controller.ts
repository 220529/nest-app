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

  @Get('customers')
  getCustomersData(
    @Query('page') page: number = 1,
    @Query('size') size: number = 10,
  ) {
    // 总数据量
    const totalItems = 12;

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

    return {
      page,
      size,
      totalItems,
      totalPages: Math.ceil(totalItems / size),
      data: paginatedItems, // 返回当前页的数据
    };
  }

  @Get('dispatchs')
  getDispatchsData(
    @Query('page') page: number = 1,
    @Query('size') size: number = 10,
  ) {
    // 总数据量
    const totalItems = 21;

    // 使用Mock.js动态生成数据
    const items = Mock.mock({
      [`data|${totalItems}`]: [
        {
          serialNumber: '@increment(1)',
          roleType: '@pick(["渠道部经理", "其他角色", "项目经理", "技术主管"])',
          originalPersonnel: '@cname',
          departmentOfOriginalPersonnel: '@city()',
          orderIssuingTime: '@datetime("yyyy-MM-dd HH:mm:ss")',
          transferredPersonnel: '@cname',
          departmentOfTransferredPersonnel: '@city()',
          reasonForTransfer: '@pick(["更换人员", "业务调整", "项目变更"])',
          operator: '@cname',
          transferTime: '@datetime("yyyy-MM-dd HH:mm:ss")'
        }
      ]
    }).data;

    // 分页逻辑
    const startIndex = (page - 1) * size; // 计算当前页开始的数据索引
    const endIndex = Number(startIndex) + Number(size); // 计算当前页结束的数据索引
    const paginatedItems = items.slice(startIndex, endIndex); // 切片获取当前页的数据

    return {
      page,
      size,
      totalItems,
      totalPages: Math.ceil(totalItems / size),
      data: paginatedItems, // 返回当前页的数据
    };
  }

  @Get('final-accounts')
  getDispatchData() {
    // 使用 Mock.js 动态生成数据
    const dispatch = Mock.mock({
      'list|6': [
        {
          'id': '@increment',
          'date': '@datetime("yyyy-MM-dd HH:mm:ss")',
          'name': '@cname',
          'position': '@pick(["渠道部经理", "系统管理员A", "渠道专员"])'
        }
      ]
    });

    const customer = Mock.mock({
      'name': '@cname',
      'dispatchPhone': /1[3-9]\d{9}/,
      'signingPhone': /1[3-9]\d{9}/,
      'decorationAddress': '@county(true) @city(true) @province(true) @natural(1, 10) @string("number", 3) 号 @company',
      'houseArea': '@float(60, 150, 2, 2)',
      'houseStatus': '@pick(["新房", "老房"]) @pick(["有电梯", "无电梯"]) @pick(["半包", "全包"]) @pick(["出租", "自住"])',
      'houseType': '@integer(1, 5)室@integer(1, 3)厅@integer(1, 2)厨@integer(1, 3)卫@integer(0, 2)阳台'
    });

    // 模拟订单流程数据
    let orderProcess = Mock.mock({
      'orderProcess|7': [
        {
          'title': function () {
            const names = ['创建订单', '转订单', '确认签单', '锁定订单', '开工申请通过', '工程排期', '竣工'];
            return names[Mock.Random.integer(0, 6)];
          },
          'time': Mock.Random.datetime('yyyy-MM-dd HH:mm:ss'),
          // 'status': function () {
          //   const statusOptions = ['done', 'doing', 'undone'];
          //   return statusOptions[Mock.Random.integer(0, 2)];
          // },
          'description': '@pick(["已完成", "进行中", "未开始"])'
        }
      ]
    }).orderProcess;

    orderProcess = orderProcess.map((item, index) => {
      return {
        id: index + 1,
        ...item
      }
    })

    return {
      orderProcess: orderProcess, customer, dispatchInformation: dispatch.list
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
