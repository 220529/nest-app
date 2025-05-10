import { NestFactory, Reflector } from "@nestjs/core";
import { SwaggerModule, DocumentBuilder } from "@nestjs/swagger";
import { ClassSerializerInterceptor, ValidationPipe } from "@nestjs/common";
import { AppModule } from "@/app.module";
import { LoggingInterceptor } from "@/interceptors/logging.interceptor";
import { TransformInterceptor } from "@/interceptors/transform.interceptor";
import { HttpExceptionFilter } from "@/filters/http-exception.filter";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalInterceptors(
    new ClassSerializerInterceptor(app.get(Reflector)),
    new LoggingInterceptor(),
    new TransformInterceptor()
  );
  app.useGlobalFilters(new HttpExceptionFilter());
  app.useGlobalPipes(new ValidationPipe()); // 添加这行
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

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
