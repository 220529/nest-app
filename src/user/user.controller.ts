import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Patch,
  Param,
  Delete,
  Query,
} from "@nestjs/common";
import { UserService } from "@/user/user.service";
import { User } from "@/user/entities/user.entity";
import { PaginationDto } from "@/common/dto/pagination.dto";
import { CreateUserDto } from "@/user/dto/create-user.dto";
import { UpdateUserDto } from "@/user/dto/update-user.dto";
import { UpdateProfileDto } from "@/user/dto/update-profile.dto";
import { AssignRolesDto } from "./dto/assign-roles.dto";

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

  @Put(":id/roles")
  async updateUserRoles(
    @Param("id") userId: string,
    @Body() dto: AssignRolesDto
  ) {
    return this.userService.assignRolesToUser(+userId, dto.roleIds);
  }

  @Delete(":id")
  delete(@Param("id") id: string) {
    return this.userService.delete(+id);
  }
}
