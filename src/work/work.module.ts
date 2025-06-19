import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserModule } from "@/user/user.module";
import { Work } from "@/work/entities/work.entity";
import { WorkService } from "@/work/work.service";
import { WorkController } from "@/work/work.controller";
import { CaslModule } from "@/casl/casl.module";

@Module({
  imports: [TypeOrmModule.forFeature([Work]), UserModule, CaslModule],
  controllers: [WorkController],
  providers: [WorkService],
})
export class WorkModule {}
