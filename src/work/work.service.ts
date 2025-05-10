import { Repository } from "typeorm";
import {
  Injectable,
  NotFoundException,
  ConflictException,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { PaginationDto } from "@/common/dto/pagination.dto";
import { UserService } from "@/user/user.service";
import { Work } from "@/work/entities/work.entity";
import { CreateWorkDto } from "./dto/create-work.dto";
import { UpdateWorkDto } from "./dto/update-work.dto";

@Injectable()
export class WorkService {
  constructor(
    @InjectRepository(Work)
    private readonly workRepo: Repository<Work>,
    private userService: UserService
  ) {}

  async create(userId: number, createWorkDto: CreateWorkDto) {
    // 1. 检查用户存在性
    const user = await this.userService.findOne({ id: userId });
    if (!user) throw new NotFoundException("用户不存在");

    // 2. 防重名检查（同用户下不允许重复作品名）
    const existingWork = await this.workRepo.findOne({
      where: {
        title: createWorkDto.title,
        user: { id: userId },
      },
    });

    if (existingWork) {
      throw new ConflictException("该作品名称已被使用");
    }

    // 3. 创建作品
    const work = this.workRepo.create({
      ...createWorkDto,
      user: user,
    });

    return this.workRepo.save(work);
  }

  async findAll(
    paginationDto: PaginationDto
  ): Promise<{ rows: Work[]; total: number; page: number; limit: number }> {
    const { page = 1, limit = 10 } = paginationDto;
    const [rows, total] = await this.workRepo.findAndCount({
      skip: (page - 1) * limit,
      take: limit,
      order: { id: "ASC" }, // 可以添加排序
    });
    return { rows, total, page, limit };
  }

  async findOne(params) {
    return await this.workRepo.findOne({
      where: { ...params },
    });
  }

  async update(
    userId: number,
    workId: number,
    updateWorkDto: UpdateWorkDto
  ): Promise<Work> {
    // 1. 验证用户存在性
    const user = await this.userService.findOne({ id: userId });
    if (!user) throw new NotFoundException("用户不存在");

    // 2. 获取目标作品
    const work = await this.workRepo.findOne({
      where: {
        id: workId,
        user: { id: userId },
      },
    });
    if (!work) throw new NotFoundException("作品不存在或无权修改");

    // 3. 如果尝试修改标题，检查重名
    if (updateWorkDto.title && updateWorkDto.title !== work.title) {
      const existingWork = await this.workRepo.findOne({
        where: {
          title: updateWorkDto.title,
          user: { id: userId },
        },
      });

      if (existingWork) {
        throw new ConflictException("该作品名称已被使用");
      }
    }

    // 4. 合并并保存更新
    const updatedWork = this.workRepo.merge(work, updateWorkDto);
    return this.workRepo.save(updatedWork);
  }

  delete(workId: number) {
    return this.workRepo.delete(workId);
  }
}
