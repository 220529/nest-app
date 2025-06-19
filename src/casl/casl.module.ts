import { Module } from "@nestjs/common";
import { UserModule } from "@/user/user.module";
import { PermissionModule } from "@/permission/permission.module";
import { CaslAbilityFactory } from "@/casl/casl-ability.factory";

@Module({
  imports: [UserModule, PermissionModule],
  providers: [CaslAbilityFactory],
  exports: [CaslAbilityFactory],
})
export class CaslModule {}
