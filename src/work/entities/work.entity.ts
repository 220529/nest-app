import { Entity, Column, ManyToOne, JoinColumn } from "typeorm";
import { BaseEntity } from "@/common/entities/base.entity";
import { User } from "@/user/entities/user.entity";
import { WorkStatus } from "@/enums/work";

@Entity()
export class Work extends BaseEntity {
  @Column()
  title: string;

  @Column()
  content: string;

  @Column({
    type: "enum",
    enum: WorkStatus,
    default: WorkStatus.UNPUBLISHED,
    comment: "状态",
  })
  status: WorkStatus; // PUBLISHED | UNPUBLISHED

  @ManyToOne(() => User, (user) => user.works, {
    onDelete: "CASCADE", // 数据库级联删除
  })
  @JoinColumn({ name: "user_id" }) // 外键列
  user: User;
}
