import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";
import { User } from "@/user/entities/user.entity";

@Entity()
export class Work {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  content: string;

  @ManyToOne(() => User, (user) => user.works, {
    onDelete: "CASCADE", // 数据库级联删除
  })
  @JoinColumn()
  user: User;

  @CreateDateColumn()
  createTime: Date;

  @UpdateDateColumn()
  updateTime: Date; // 自动在save()时更新
}
