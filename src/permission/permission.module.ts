import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { PermissionService } from "@/permission/permission.service";
import { PermissionController } from "@/permission/permission.controller";
import { Permission } from "@/permission/entities/permission.entity";
import { Role } from "@/role/entities/role.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Permission, Role])],
  controllers: [PermissionController],
  providers: [PermissionService],
  exports: [PermissionService],
})
export class PermissionModule {}
