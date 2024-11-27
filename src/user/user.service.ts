import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './schemas/user.schema';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

const excludes = { __v: 0, password: 0 };

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
  ) {}

  async findAll(): Promise<User[]> {
    return this.userModel.find().select({ __v: 0 }).exec();
  }

  async findOne(id: string): Promise<User> {
    return this.userModel.findById(id).select(excludes).exec();
  }

  async create(createUserDto: CreateUserDto): Promise<User> {
    // 检查是否已经被注册
    const existingUser = await this.userModel.findOne({
      // username: createUserDto.username,
    });
    if (existingUser) {
      throw new HttpException(
        'User already registered',
        HttpStatus.BAD_REQUEST,
      );
    }

    // 创建用户
    const createdUser = new this.userModel(createUserDto);
    const user = await createdUser.save();
    return user;
    // return this.findOne(user._id);
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    return this.userModel
      .findByIdAndUpdate(id, updateUserDto, {
        new: true,
      })
      .select(excludes)
      .exec();
  }

  async findOneByParams(params: Partial<CreateUserDto>): Promise<User> {
    return this.userModel.findOne(params).exec();
  }

  async remove(id: string): Promise<User> {
    return this.userModel.findByIdAndDelete(id).select({ _id: 1 }).exec();
  }
}
