import {
  Injectable,
  HttpException,
  HttpStatus,
  ConflictException,
  NotFoundException,
} from "@nestjs/common";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "@/users/entities/user.entity";
import { Profile } from "@/users/entities/profile.entity";
import { PaginationDto } from "@/dtos/pagination.dto";
import { CreateUserDto } from "@/users/dto/create-user.dto";
import { UpdateUserDto } from "@/users/dto/update-user.dto";
import { UpdateProfileDto } from "@/users/dto/update-profile.dto";

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Profile)
    private profileRepository: Repository<Profile>
  ) {}
  async create(createUserDto: CreateUserDto): Promise<User> {
    try {
      // 检查用户名是否已存在
      const existingUser = await this.userRepository.findOne({
        where: { username: createUserDto.username },
      });
      if (existingUser) {
        throw new ConflictException("Username already exists");
      }
      const user = this.userRepository.create({
        ...createUserDto,
        profile: {},
      });
      return await this.userRepository.save(user);
    } catch (error) {
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async findAll(
    paginationDto: PaginationDto
  ): Promise<{ rows: User[]; total: number; page: number; limit: number }> {
    const { page = 1, limit = 10 } = paginationDto;
    const [rows, total] = await this.userRepository.findAndCount({
      skip: (page - 1) * limit,
      relations: ["profile"],
      take: limit,
      order: { id: "ASC" }, // 可以添加排序
    });
    return { rows, total, page, limit };
  }

  async findOne(params) {
    return await this.userRepository.findOne({
      where: { ...params },
      relations: ["profile"],
    });
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    // 检查用户名是否已存在（如果提供了新用户名）
    if (updateUserDto.username && updateUserDto.username !== user.username) {
      const existingUser = await this.userRepository.findOne({
        where: { username: updateUserDto.username },
      });
      if (existingUser) {
        throw new ConflictException("Username already exists");
      }
    }

    await this.userRepository.update(id, updateUserDto);
    return await this.findOne({ id });
  }

  // 更新用户详情
  async updateProfile(userId: number, dto: UpdateProfileDto) {
    const user = await this.findOne({ id: userId });

    if (!user) throw new NotFoundException("用户不存在");

    user.profile = this.profileRepository.merge(user.profile, dto);
    return this.userRepository.save(user);
  }

  async delete(userId: number) {
    return this.userRepository.delete(userId);
  }
}
