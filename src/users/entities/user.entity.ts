import { Exclude } from "class-transformer";
import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

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
}
