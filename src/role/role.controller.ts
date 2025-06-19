import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
} from "@nestjs/common";
import { RoleService } from "./role.service";
import { CreateRoleDto } from "@/role/dto/create-role.dto";
import { UpdateRoleDto } from "@/role/dto/update-role.dto";
import { AssignPermissionsDto } from "@/role/dto/assign-permissions.dto";

@Controller("role")
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @Post()
  create(@Body() dto: CreateRoleDto) {
    return this.roleService.create(dto);
  }

  @Get()
  findAll() {
    return this.roleService.findAll();
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.roleService.findOne(+id);
  }

  @Put(":id")
  update(@Param("id") id: string, @Body() dto: UpdateRoleDto) {
    return this.roleService.update(+id, dto);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.roleService.remove(+id);
  }

  // 分配权限接口
  @Put(":id/permissions")
  assignPermissions(
    @Param("id") id: string,
    @Body() dto: AssignPermissionsDto
  ) {
    return this.roleService.assignPermissions(+id, dto.permissionIds);
  }
}
