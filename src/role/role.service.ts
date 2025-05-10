import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository, In } from "typeorm";
import { Role } from "./entities/role.entity";
import { CreateRoleDto } from "./dto/create-role.dto";
import { UpdateRoleDto } from "./dto/update-role.dto";
import { PermissionService } from "@/permission/permission.service";

@Injectable()
export class RoleService {
  constructor(
    @InjectRepository(Role)
    private readonly roleRepo: Repository<Role>,
    private readonly permissionService: PermissionService
  ) {}

  async create(dto: CreateRoleDto) {
    const role = this.roleRepo.create(dto);

    if (dto.permissionIds?.length) {
      role.permissions = await this.permissionService.findByIds(
        dto.permissionIds
      );
    }

    return this.roleRepo.save(role);
  }

  // 总是关联 permissions
  async findAll() {
    return this.roleRepo.find({ relations: ["permissions"] });
  }

  // 总是关联 permissions
  async findOne(id: number) {
    const role = await this.roleRepo.findOne({
      where: { id },
      relations: ["permissions"],
    });
    if (!role) throw new NotFoundException("Role not found");
    return role;
  }

  /**
   * 批量查询角色（带存在性校验）
   */
  async findByIds(ids: number[]): Promise<Role[]> {
    if (!ids.length) return [];

    const roles = await this.roleRepo.findBy({ id: In(ids) });
    if (roles.length !== ids.length) {
      const missingIds = ids.filter((id) => !roles.some((r) => r.id === id));
      throw new NotFoundException(`以下角色不存在: ${missingIds.join(",")}`);
    }
    return roles;
  }

  async update(id: number, dto: UpdateRoleDto) {
    const role = await this.findOne(id); // 复用已有关联查询

    if (dto.permissionIds) {
      role.permissions = await this.permissionService.findByIds(
        dto.permissionIds
      );
    }

    Object.assign(role, dto);
    return this.roleRepo.save(role);
  }

  async remove(id: number) {
    await this.roleRepo.delete(id);
  }

  async assignPermissions(roleId: number, permissionIds: number[]) {
    return this.update(roleId, { permissionIds } as UpdateRoleDto);
  }
}
