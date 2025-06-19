import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserModule } from "@/user/user.module";
import { AuthModule } from "@/auth/auth.module";
import { WorkModule } from "@/work/work.module";
import { RoleModule } from "@/role/role.module";
import { PermissionModule } from "@/permission/permission.module";
import { CaslModule } from "@/casl/casl.module";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath:
        process.env.NODE_ENV === "production" ? ".env.prod" : ".env.dev",
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        type: "mysql", // 数据库类型
        entities: [__dirname + "/**/*.entity{.ts,.js}"], // 数据表实体
        host: configService.get("HOST", "localhost"), // 主机，默认为localhost
        port: configService.get<number>("MYSQL_PORT", 3306), // 端口号
        username: configService.get("ROOT_NAME", "root"), // 用户名
        password: configService.get("ROOT_PASSWORD", "root"), // 密码
        database: configService.get("MYSQL_DATABASE", "v1_base"), //数据库名
        timezone: "+08:00", // 服务器上配置的时区
        synchronize: true, // 根据实体自动创建数据库表， 生产环境建议关闭
      }),
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
