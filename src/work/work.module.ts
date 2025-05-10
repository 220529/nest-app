import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserModule } from "@/user/user.module";
import { Work } from "./entities/work.entity";
import { WorkService } from "./work.service";
import { WorkController } from "./work.controller";

@Module({
  imports: [TypeOrmModule.forFeature([Work]), UserModule],
  controllers: [WorkController],
  providers: [WorkService],
})
export class WorkModule {}
