import { Injectable, NotFoundException } from "@nestjs/common";
import { Repository, In } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { Permission } from "./entities/permission.entity";
import { CreatePermissionDto } from "./dto/create-permission.dto";
import { UpdatePermissionDto } from "./dto/update-permission.dto";

@Injectable()
export class PermissionService {
  constructor(
    @InjectRepository(Permission)
    private readonly permissionRepo: Repository<Permission>
  ) {}

  async create(dto: CreatePermissionDto) {
    const permission = this.permissionRepo.create(dto);
    return this.permissionRepo.save(permission);
  }

  async findAll() {
    return this.permissionRepo.find();
  }

  async findOne(id: number) {
    return await this.permissionRepo.findOne({
      where: { id },
    });
  }

  async findByIds(ids: number[]): Promise<Permission[]> {
    if (!ids.length) return [];
    const permissions = await this.permissionRepo.findBy({ id: In(ids) });
    if (permissions.length !== ids.length) {
      const missingIds = ids.filter(
        (id) => !permissions.some((r) => r.id === id)
      );
      throw new NotFoundException(`以下权限不存在: ${missingIds.join(",")}`);
    }
    return permissions;
  }

  async update(id: number, dto: UpdatePermissionDto) {
    await this.permissionRepo.update(id, dto);
    return this.findOne(id);
  }

  async remove(id: number) {
    await this.permissionRepo.delete(id);
  }
}
