import { Entity, Column, ManyToMany } from "typeorm";
import { BaseEntity } from "@/common/entities/base.entity";
import { Role } from "@/role/entities/role.entity";

@Entity()
export class Permission extends BaseEntity {
  @Column({ unique: true, length: 50 })
  code: string; // 如 'user:create'

  @Column({ length: 100 })
  name: string; // 如 '创建用户'

  @Column({ type: "text", nullable: true })
  description: string;

  @Column({ default: true })
  isActive: boolean; // 是否启用

  // 添加反向关系定义（关键修正点）
  @ManyToMany(() => Role, (role) => role.permissions)
  roles: Role[];
}
