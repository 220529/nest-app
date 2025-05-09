import { Exclude } from "class-transformer";
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
} from "typeorm";
import { Profile } from "./profile.entity";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

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

  @CreateDateColumn()
  createTime: Date;

  @UpdateDateColumn()
  updateTime: Date;
}
