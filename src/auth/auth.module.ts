import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { APP_GUARD } from "@nestjs/core";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { PassportModule } from "@nestjs/passport";

import { AuthController } from "@/auth/auth.controller";
import { AuthService } from "@/auth/auth.service";
import { UserModule } from "@/user/user.module";
import { AuthGuard } from "@/common/guards/auth.guard";
import { CaslGuard } from "@/common/guards/casl.guard";
import { CaslModule } from "@/casl/casl.module";

@Module({
  imports: [
    UserModule,
    PassportModule.register({
      defaultStrategy: "jwt",
      session: false, // 无状态JWT不需要session
    }),

    // 异步动态配置JWT模块
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        global: true,
        secret: configService.get<string>("NEST_SECRET"),
        signOptions: { expiresIn: "7d" },
      }),
      inject: [ConfigService],
    }),
    CaslModule,
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
    {
      provide: APP_GUARD,
      useClass: CaslGuard,
    },
  ],
  exports: [AuthService],
})
export class AuthModule {}
