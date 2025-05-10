import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { User } from "@/user/entities/user.entity";
import { Work } from "@/work/entities/work.entity";
import { Profile } from "@/user/entities/profile.entity";
import { UserService } from "@/user/user.service";
import { UserController } from "@/user/user.controller";

@Module({
  imports: [TypeOrmModule.forFeature([User, Profile, Work])],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
