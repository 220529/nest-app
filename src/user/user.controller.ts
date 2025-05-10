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
import { UserService } from "@/user/user.service";
import { User } from "@/user/entities/user.entity";
import { PaginationDto } from "@/dtos/pagination.dto";
import { CreateUserDto } from "@/user/dto/create-user.dto";
import { UpdateUserDto } from "@/user/dto/update-user.dto";
import { UpdateProfileDto } from "@/user/dto/update-profile.dto";

@Controller("user")
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get()
  findAll(@Query() paginationDto: PaginationDto) {
    return this.userService.findAll(paginationDto);
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.userService.findOne({ id: +id });
  }

  @Patch(":id")
  update(@Param("id") id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }

  @Patch(":id/profile")
  updateProfile(@Param("id") userId: number, @Body() dto: UpdateProfileDto) {
    return this.userService.updateProfile(userId, dto);
  }

  @Delete(":id")
  delete(@Param("id") id: string) {
    return this.userService.delete(+id);
  }
}
