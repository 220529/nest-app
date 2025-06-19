import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { RoleService } from "@/role/role.service";
import { RoleController } from "@/role/role.controller";
import { Role } from "@/role/entities/role.entity";
import { PermissionModule } from "@/permission/permission.module";

@Module({
  imports: [TypeOrmModule.forFeature([Role]), PermissionModule],
  controllers: [RoleController],
  providers: [RoleService],
  exports: [RoleService],
})
export class RoleModule {}
