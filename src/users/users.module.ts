import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { User } from "@/users/entities/user.entity";
import { Profile } from "@/users/entities/profile.entity";
import { UsersService } from "@/users/users.service";
import { UserController } from "@/users/users.controller";

@Module({
  imports: [TypeOrmModule.forFeature([User, Profile])],
  controllers: [UserController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
