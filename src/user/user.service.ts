import {
  Injectable,
  HttpException,
  HttpStatus,
  ConflictException,
  NotFoundException,
} from "@nestjs/common";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "@/user/entities/user.entity";
import { Profile } from "@/user/entities/profile.entity";
import { PaginationDto } from "@/common/dto/pagination.dto";
import { CreateUserDto } from "@/user/dto/create-user.dto";
import { UpdateUserDto } from "@/user/dto/update-user.dto";
import { UpdateProfileDto } from "@/user/dto/update-profile.dto";
import { RoleService } from "@/role/role.service";

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepo: Repository<User>,
    @InjectRepository(Profile)
    private profileRepo: Repository<Profile>,
    private roleService: RoleService
  ) {}
  async create(createUserDto: CreateUserDto): Promise<User> {
    try {
      // 检查用户名是否已存在
      const existingUser = await this.userRepo.findOne({
        where: { username: createUserDto.username },
      });
      if (existingUser) {
        throw new ConflictException("Username already exists");
      }

      const defaultRole = await this.roleService.findOne({
        code: createUserDto.code || "user",
      });

      const user = this.userRepo.create({
        ...createUserDto,
        profile: {},
        roles: [defaultRole],
      });
      return await this.userRepo.save(user);
    } catch (error) {
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async findAll(
    paginationDto: PaginationDto
  ): Promise<{ rows: User[]; total: number; page: number; limit: number }> {
    const { page = 1, limit = 10 } = paginationDto;
    const [rows, total] = await this.userRepo.findAndCount({
      skip: (page - 1) * limit,
      relations: ["profile", "works", "roles"],
      take: limit,
      order: { id: "ASC" }, // 可以添加排序
    });
    return { rows, total, page, limit };
  }

  async findOne(params) {
    return await this.userRepo.findOne({
      where: { ...params },
      relations: ["profile", "works", "roles"],
    });
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const user = await this.userRepo.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    // 检查用户名是否已存在（如果提供了新用户名）
    if (updateUserDto.username && updateUserDto.username !== user.username) {
      const existingUser = await this.userRepo.findOne({
        where: { username: updateUserDto.username },
      });
      if (existingUser) {
        throw new ConflictException("Username already exists");
      }
    }

    await this.userRepo.update(id, updateUserDto);
    return await this.findOne({ id });
  }

  // 更新用户详情
  async updateProfile(userId: number, dto: UpdateProfileDto) {
    const user = await this.findOne({ id: userId });

    if (!user) throw new NotFoundException("用户不存在");

    user.profile = this.profileRepo.merge(user.profile, dto);
    return this.userRepo.save(user);
  }

  async assignRolesToUser(userId: number, roleIds: number[]) {
    const user = await this.userRepo.findOneBy({ id: userId });
    if (!user) throw new NotFoundException(`用户 ${userId} 不存在`);

    // 直接调用RoleService的现有方法
    const roles = await this.roleService.findByIds(roleIds);

    user.roles = roles;
    return this.userRepo.save(user);
  }

  async delete(userId: number) {
    return this.userRepo.delete(userId);
  }
}
