import { Entity, Column, ManyToMany, JoinTable } from "typeorm";
import { BaseEntity } from "@/common/entities/base.entity";
import { Permission } from "@/permission/entities/permission.entity";

@Entity()
export class Role extends BaseEntity {
  @Column({ unique: true, length: 50 })
  code: string; // 如 'admin'

  @Column({ length: 100 })
  name: string; // 如 '管理员'

  @Column({ type: "text", nullable: true })
  description: string;

  @ManyToMany(() => Permission, (permission) => permission.roles) // 添加反向引用
  @JoinTable({
    name: "role_permissions",
    joinColumn: { name: "role_id", referencedColumnName: "id" },
    inverseJoinColumn: { name: "permission_id", referencedColumnName: "id" },
  })
  permissions: Permission[];
}
