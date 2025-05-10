// src/modules/permission/permission.controller.ts
import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
  BadRequestException,
} from "@nestjs/common";
import { PermissionService } from "./permission.service";
import { CreatePermissionDto } from "./dto/create-permission.dto";
import { UpdatePermissionDto } from "./dto/update-permission.dto";

@Controller("permission")
export class PermissionController {
  constructor(private readonly permissionService: PermissionService) {}

  @Post()
  create(@Body() dto: CreatePermissionDto) {
    return this.permissionService.create(dto);
  }

  @Get()
  findAll() {
    return this.permissionService.findAll();
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.permissionService.findOne(+id);
  }

  @Put(":id")
  update(@Param("id") id: string, @Body() dto: UpdatePermissionDto) {
    if (Object.keys(dto).length === 0) {
      throw new BadRequestException("至少需要提供一个有效字段");
    }
    return this.permissionService.update(+id, dto);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.permissionService.remove(+id);
  }
}
