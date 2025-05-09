import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";
import { User } from "./user.entity";

@Entity()
export class Profile {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  avatar: string;

  @Column({ nullable: true })
  address: string;

  @OneToOne(() => User, (user) => user.profile, {
    onDelete: "CASCADE", // 数据库级联删除
  })
  @JoinColumn()
  user: User;

  @CreateDateColumn()
  createTime: Date;

  @UpdateDateColumn()
  updateTime: Date;
}
