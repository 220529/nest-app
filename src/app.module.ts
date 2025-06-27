import { Module, Logger } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserModule } from "@/user/user.module";
import { AuthModule } from "@/auth/auth.module";
import { WorkModule } from "@/work/work.module";
import { RoleModule } from "@/role/role.module";
import { PermissionModule } from "@/permission/permission.module";
import { CaslModule } from "@/casl/casl.module";
import { readdirSync } from "fs";
import { webcrypto } from "node:crypto";

// 将 Web Crypto API 挂载到 globalThis
if (!globalThis.crypto) {
  globalThis.crypto = webcrypto as unknown as Crypto;
}

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: process.env.NODE_ENV === "production" ? ".env" : ".env.dev",
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        const logger = new Logger("TypeORMConfig");

        // 打印当前目录文件
        const currentDir = process.cwd();
        const files = readdirSync(currentDir);
        logger.log(`当前目录文件: ${files.join(", ")}`);

        // 打印数据库配置
        const dbConfig = {
          host: configService.get("MYSQL_HOST", "localhost"),
          port: configService.get<number>("MYSQL_PORT", 3306),
          username: configService.get("MYSQL_ROOT_NAME", "root"),
          database: configService.get("MYSQL_DATABASE", "v1_base"),
        };
        logger.log(`数据库配置: ${JSON.stringify(dbConfig)}`);

        return {
          type: "mysql",
          entities: [__dirname + "/**/*.entity{.ts,.js}"],
          ...dbConfig,
          password: configService.get("MYSQL_ROOT_PASSWORD", "root"), // 单独处理密码
          timezone: "+08:00",
          synchronize: true,
        };
      },
    }),
    UserModule,
    AuthModule,
    WorkModule,
    RoleModule,
    PermissionModule,
    CaslModule,
  ],
})
export class AppModule {}
