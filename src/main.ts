import { NestFactory, Reflector } from "@nestjs/core";
import { SwaggerModule, DocumentBuilder } from "@nestjs/swagger";
import { ClassSerializerInterceptor, ValidationPipe } from "@nestjs/common";
import { AppModule } from "@/app.module";
import { ConfigService } from "@nestjs/config";
import { LoggingInterceptor } from "@/common/interceptors/logging.interceptor";
import { TransformInterceptor } from "@/common/interceptors/transform.interceptor";
import { HttpExceptionFilter } from "@/common/filters/http-exception.filter";

async function bootstrap() {
  console.log("Nest process.env.NODE_ENV", process.env.NODE_ENV);
  const app = await NestFactory.create(AppModule);
  app.useGlobalInterceptors(
    new ClassSerializerInterceptor(app.get(Reflector)),
    new LoggingInterceptor(),
    new TransformInterceptor()
  );
  app.useGlobalFilters(new HttpExceptionFilter());
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true, // 关键配置！启用自动转换
      whitelist: true,
    })
  ); // 添加这行
  app.setGlobalPrefix("api");
  // 设置swagger文档
  const config = new DocumentBuilder()
    .setTitle("管理后台")
    .setDescription("管理后台接口文档")
    .setVersion("1.0")
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("api", app, document);

  const configService = app.get(ConfigService);
  await app.listen(configService.get<number>("NEST_PORT") || 3000);
  console.log(`nest-app is running on: ${await app.getUrl()}`);
}
bootstrap();
