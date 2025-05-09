import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from "@nestjs/common";
import { UsersService } from "@/users/users.service";
import { User } from "@/users/entities/user.entity";
import { PaginationDto } from "@/dtos/pagination.dto";
import { CreateUserDto } from "@/users/dto/create-user.dto";
import { UpdateUserDto } from "@/users/dto/update-user.dto";
import { UpdateProfileDto } from "@/users/dto/update-profile.dto";

@Controller("user")
export class UserController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  findAll(@Query() paginationDto: PaginationDto) {
    return this.usersService.findAll(paginationDto);
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.usersService.findOne({ id: +id });
  }

  @Patch(":id")
  update(@Param("id") id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Patch(":id/profile")
  updateProfile(@Param("id") userId: number, @Body() dto: UpdateProfileDto) {
    return this.usersService.updateProfile(userId, dto);
  }

  @Delete(":id")
  delete(@Param("id") id: string) {
    return this.usersService.delete(+id);
  }
}
