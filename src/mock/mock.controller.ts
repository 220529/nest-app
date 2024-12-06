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

  @Get('receipts')
  getReceiptsData(
    @Query('page') page: number = 1,
    @Query('size') size: number = 10,
  ) {
    // 总数据量
    const totalItems = 5;

    // 使用Mock.js动态生成数据
    const items = Mock.mock({
      [`data|${totalItems}`]: [
        {
          serialNumber: 1,
          receiptAccount: /\d{16}/,
          receiptNature: '@pick(["合同款", "订金", "套外款"])',
          receiptMethod: '@pick(["扫码"])',
          documentStatus: '已收讫',
          payee: '@cname',
          receiptAmount: '@float(100, 10000, 2, 2)',
          creationTime: '@datetime("yyyy-MM-dd HH:mm:ss")',
        }
      ]
    }).data;

    // 分页逻辑
    const startIndex = (page - 1) * size;
    const endIndex = startIndex + size;
    const paginatedItems = items.slice(startIndex, endIndex);

    return {
      page,
      size,
      totalItems,
      totalPages: Math.ceil(totalItems / size),
      data: paginatedItems,
    };
  }

  @Get('suppliers')
  getSuppliersData(
    @Query('page') page: number = 1,
    @Query('size') size: number = 10,
  ) {
    // 总数据量
    const totalItems = 12;

    // 使用Mock.js动态生成数据
    const items = Mock.mock({
      [`data|${totalItems}`]: [
        {
          // 序号
          'serialNumber': '@increment(1)',
          // 配送单号
          'deliveryOrderNumber': '@string("number", 12)',
          // 结算单号
          'settlementOrderNumber': '@string("number", 12)',
          // 支出单号
          'expenditureOrderNumber': '@string("number", 12)',
          // 收获审核
          'examine': '@cname()',
          // 收款金额（元）
          'receiptAmount': '@float(0, 10000, 2, 2)',
          // 支出金额（元）
          'deductionAmount': '@float(0, 10000, 2, 2)',        
          'expenditureAmount': '@float(0, 10000, 2, 2)',        
          // 收款状态
          'receiptStatus': '@pick(["已收款", "未收款"])',
          // 支出状态
          'expenditureStatus': '@pick(["已支出", "未支出"])',
          // 供应商
          'supplier': '@cname()',
          // 结算单位
          'settlementUnit': '@cname()'
        }
      ]
    }).data;

    // 分页逻辑
    const startIndex = (page - 1) * size;
    const endIndex = startIndex + size;
    const paginatedItems = items.slice(startIndex, endIndex);

    return {
      page,
      size,
      totalItems,
      totalPages: Math.ceil(totalItems / size),
      data: paginatedItems,
    };
  }

  @Get('launch')
  getOrdersData(
    @Query('page') page: number = 1,
    @Query('size') size: number = 10,
  ) {
    // 总数据量
    const totalItems = 11;

    // 使用Mock.js动态生成数据
    const items = Mock.mock({
      // 使用Mock.js生成一个名为list的数组，数组长度为3
      [`list|${totalItems}`]: [
        {
          // 序号
          id: '@increment',
          // 流程类型
          flowType: '@ctitle(5, 10)',
          // 流程名称
          flowName: '@ctitle(10, 20)',
          // 流程状态
          flowStatus: '进行中',
          // 审批节点总数
          approvalNodeTotal: 5,
          // 审批总耗时
          approvalTotalTime: 5,
          // 退回次数
          returnTimes: 1,
          // 退回节点
          returnNode: '@ctitle(5, 10)',
          // 是否作废
          isVoid: '@boolean',
          // 作废原因
          voidReason: '@ctitle(5, 10)',
          // 创建时间
          createTime: '@datetime("yyyy-MM-dd HH:mm:ss")',
          // 完成时间
          completeTime: '@datetime("yyyy-MM-dd HH:mm:ss")'
        }
      ]
    }).list;

    // 分页逻辑
    const startIndex = (page - 1) * size;
    const endIndex = startIndex + size;
    const paginatedItems = items.slice(startIndex, endIndex);

    return {
      page,
      size,
      totalItems,
      totalPages: Math.ceil(totalItems / size),
      data: paginatedItems,
    };
  }

  @Get('engineering')
  getGngineeringsData(
    @Query('page') page: number = 1,
    @Query('size') size: number = 10,
  ) {
    // 总数据量
    const totalItems = 21;

    // 使用Mock.js动态生成数据
    const items = Mock.mock({
      [`data|${totalItems}`]: [
        {
          'id': '@increment(1)',
          // 订单号
          'orderNumber': /HTCW\d{20}|HTA2\d{20}/,
          // 客户姓名
          'customerName': '@cname',
          // 节点名称
          'nodeName': '@pick(["中期验收", "电路验收", "水路验收", "基材收货确认", "设计师全部主材下单完成", "开工交底", "项目经理基材下单"])',
          // 节点状态
          'nodeStatus': [0, 1, 2][Math.floor(Math.random() * 3)],
          // 预警状态
          'warningStatus': [0, 1, 2][Math.floor(Math.random() * 3)],
          // 通知数量
          'notificationCount': '@integer(0, 9)',
          // 通知详情
          'notificationDetails': '@integer(0, 9)',
          // 设计师姓名
          'designer': '@cname',
          // 设计师电话
          'designerPhone': /1[3-9]\d{9}/,
          // 设计师归属
          'designerAffiliation': '@sentence(0, 10)',
          // 监理姓名
          'supervisor': '@cname',
          // 监理电话
          'supervisorPhone': /1[3-9]\d{9}/,
          // 项目经理姓名
          'projectManager': '@cname',
          // 项目经理电话
          'projectManagerPhone': /1[3-9]\d{9}/,
          // 渠道经理姓名
          'channelManager': '@cname',
          // 渠道专员电话
          'channelSpecialistPhone': /1[3-9]\d{9}/,
          // 渠道归属
          'channelAffiliation': '@sentence(0, 10)',
          // 产品名称
          'productName': '@cname',
          // 面积
          'area': '@float(10, 1000, 2, 2)',
          // 房屋状况
          'houseCondition': ['老房', '新房'][Math.floor(Math.random() * 2)],
          // 锁单额
          'lockAmount': '@float(1000, 50000, 2, 2)',
          // 开单时间
          'orderStartTime': '@datetime("yyyy-MM-dd HH:mm:ss")',
          // 结束时间
          'orderEndTime': '@datetime("yyyy-MM-dd HH:mm:ss")'
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
      ],
      'modifyNum': '@integer(0, 9)'
    });
    // 模拟14天09时50分14秒这样格式的数据
    const mockTime = Mock.mock({
      'days': '@integer(0, 100)',
      'hours': '@integer(0, 23)',
      'minutes': '@integer(0, 59)',
      'seconds': '@integer(0, 59)'
    });
    const processFlow = Mock.mock({
      'list|2': [
        {
          'id': '@increment',
          'currentNode': Mock.mock('@pick(["某某节点", "结束"])'),
          'currentNodeLabel': '@increment',
          'currentNodeUseTime': `${mockTime.days}天${mockTime.hours}时${mockTime.minutes}分${mockTime.seconds}秒`,
          'taskUseTime': `${mockTime.days}天${mockTime.hours}时${mockTime.minutes}分${mockTime.seconds}秒`,
          'startTime': Mock.mock('@date("yyyy-MM-dd HH:mm:ss")'),
          'specialOfferApplication': Mock.mock('@string("upper", 5, 20)_@cname()_@integer(100000, 999999)'),
          'relatedCode': Mock.mock('@string("number", 5, 20)_@string("upper", 5, 10)@date("yyyyMMdd")@string("number", 4, 8)'),
          'returnTimes': Mock.mock('@integer(0, 10)'),
          'status': Mock.mock('@pick(["处理中", "通过", "退回"])' as '处理中' | '通过' | '退回')
        }
      ],
      'modifyNum': '@integer(0, 9)'
    }).list;

    const customer = Mock.mock({
      'name': '@cname',
      'dispatchPhone': /1[3-9]\d{9}/,
      'signingPhone': /1[3-9]\d{9}/,
      'decorationAddress': '@county(true) @city(true) @province(true) @natural(1, 10) @string("number", 3) 号 @company',
      'houseArea': '@float(60, 150, 2, 2)',
      'houseStatus': '@pick(["新房", "老房"]) @pick(["有电梯", "无电梯"]) @pick(["半包", "全包"]) @pick(["出租", "自住"])',
      'houseType': '@integer(1, 5)室@integer(1, 3)厅@integer(1, 2)厨@integer(1, 3)卫@integer(0, 2)阳台',
      'modifyNum': '@integer(0, 9)'
    });

    const packageInfo = Mock.mock({
      // 项目名称
      'projectName': '新悦享',
      // 项目编号
      'projectNumber': 128800,
      // 项目增量
      'projectIncrement': '+499',
      // 面积
      'area': '80',
      // 签单额
      'signedAmount': 334567,
      // 锁单额
      'lockedAmount': 334567,
      // 竣工额
      'completedAmount': 334567,
      // 总成本（不含提成）
      'totalCost': 334567.00,
      // 毛利额（不含提成）
      'grossProfit': 334567.00,
      // 税金
      'tax': 11268.07,
      // 管理费
      'managementFee': 43101.00,
      // 远程费
      'remoteFee': 334567.11,
      // 毛利率
      'grossProfitMargin': '32.09',
    });

    // 模拟订单流程数据
    let orderProcess = Mock.mock({
      'list|7': [
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
      ],
    }).list;

    orderProcess = orderProcess.map((item, index) => {
      return {
        id: index + 1,
        ...item
      }
    })

    const projectProgress = Mock.mock({
      // 总工期
      'totalWorkDays': 55,
      // 开始时间
      'startTime': '2024-08-11 21:40:56',
      // 预计竣工时间
      'expectedEndTime': '2024-09-30',
      // 实际竣工时间（这里随机生成一个时间格式，模拟未竣工）
      'actualEndTime': Mock.Random.datetime('yyyy-MM-dd'),
      // 进行中节点和逾期情况
      'inProgressNodes': {
        'total': 2,
        'overdue': 1
      },
      // 已完成节点
      'completedNodes': 20,
      // 未开始节点
      'notStartedNodes': 20,
      // 逾期节点
      'overdueNodes': 20,
      // 工程进度
      'progress': {
        'percentage': 45,
        'completedNodesCount': 10
      },
      // 当前节点和逾期情况
      'currentNode': {
        'name': '项目经理收货',
        'overdueDays': 5
      }
    });

    return {
      orderProcess, customer, dispatchInformation: { modifyNum: dispatch.modifyNum, list: dispatch.list }, projectProgress,
      packageInfo,
      processFlow
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
