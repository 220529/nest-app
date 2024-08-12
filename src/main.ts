import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { HttpExceptionFilter } from '@/filter/http-exception.filter';
import { TransformInterceptor } from '@/global/transform.interceptor';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // 异常过滤器
  app.useGlobalFilters(new HttpExceptionFilter());
  // 响应拦截器
  app.useGlobalInterceptors(new TransformInterceptor());
  // 全局路由前缀
  // app.setGlobalPrefix('api');

  const options = new DocumentBuilder().build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);

  await app.listen(16800);
  console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();
