import { Exclude } from "class-transformer";
import {
  Entity,
  Column,
  OneToOne,
  OneToMany,
  ManyToMany,
  JoinTable,
} from "typeorm";
import { BaseEntity } from "@/common/entities/base.entity";
import { Profile } from "@/user/entities/profile.entity";
import { Work } from "@/work/entities/work.entity";
import { Role } from "@/role/entities/role.entity";

@Entity()
export class User extends BaseEntity {
  @Column()
  username: string;

  @Exclude() // 排除 password 字段
  @Column()
  password: string;

  @Column({ default: false }) // 设置默认值为 false
  disable?: boolean; // 将 disable 字段声明为可选

  @OneToOne(() => Profile, (profile) => profile.user, {
    cascade: true, // TypeORM 级联操作
  })
  profile: Profile;

  @OneToMany(() => Work, (work) => work.user, {
    cascade: true,
  })
  works: Work[];

  @ManyToMany(() => Role)
  @JoinTable({
    name: "user_roles", // 明确指定关联表名
    joinColumn: { name: "user_id", referencedColumnName: "id" },
    inverseJoinColumn: { name: "role_id", referencedColumnName: "id" },
  })
  roles: Role[];
}
