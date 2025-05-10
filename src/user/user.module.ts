import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserService } from "@/user/user.service";
import { UserController } from "@/user/user.controller";
import { RoleModule } from "@/role/role.module";
import { User } from "@/user/entities/user.entity";
import { Work } from "@/work/entities/work.entity";
import { Role } from "@/role/entities/role.entity";
import { Profile } from "@/user/entities/profile.entity";

@Module({
  imports: [TypeOrmModule.forFeature([User, Profile, Work, Role]), RoleModule],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
