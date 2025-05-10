import { Entity, Column, ManyToOne, JoinColumn } from "typeorm";
import { BaseEntity } from "@/common/entities/base.entity";
import { User } from "@/user/entities/user.entity";

@Entity()
export class Work extends BaseEntity {
  @Column()
  title: string;

  @Column()
  content: string;

  @ManyToOne(() => User, (user) => user.works, {
    onDelete: "CASCADE", // 数据库级联删除
  })
  @JoinColumn({ name: "user_id" }) // 外键列
  user: User;
}
