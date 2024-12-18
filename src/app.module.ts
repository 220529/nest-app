import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { CatsModule } from './cat/cats.module';
import { CaptureModule } from './capture/capture.module';
import { MonitorModule } from './monitor/monitor.module';
import { OssModule } from './oss/oss.module';
import { TaroModule } from './taro/taro.module';
import { AuthModule } from '@/auth/auth.module';
import { UserModule } from '@/user/user.module';
import { MockModule } from '@/mock/mock.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath:
        process.env.NODE_ENV === 'production' ? '.env' : '.env.local',
    }),
    // MongooseModule.forRootAsync({
    //   imports: [ConfigModule],
    //   inject: [ConfigService],
    //   useFactory: (configService: ConfigService) => {
    //     const config = {
    //       user: configService.get('MONGO_INITDB_ROOT_USERNAME'),
    //       pass: configService.get('MONGO_INITDB_ROOT_PASSWORD'),
    //       dbName: configService.get('MONGO_INITDB_DATABASE'),
    //       uri: `mongodb://${configService.get('MONGO_HOST')}:${configService.get('MONGO_PORT')}`,
    //     };
    //     console.log('MongoDB: ', config);
    //     return config;
    //   },
    // }),
    // CatsModule,
    // CaptureModule,
    // MonitorModule,
    // OssModule,
    // TaroModule,
    // AuthModule,
    // UserModule,
    MockModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
