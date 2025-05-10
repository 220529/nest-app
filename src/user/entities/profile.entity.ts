import { Entity, Column, OneToOne, JoinColumn } from "typeorm";
import { BaseEntity } from "@/common/entities/base.entity";
import { User } from "./user.entity";

@Entity()
export class Profile extends BaseEntity {
  @Column({ nullable: true })
  avatar: string;

  @Column({ nullable: true })
  address: string;

  @OneToOne(() => User, (user) => user.profile, {
    onDelete: "CASCADE", // 数据库级联删除
  })
  @JoinColumn({ name: "user_id" }) // 外键列
  user: User;
}
