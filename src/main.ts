import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import * as session from 'express-session';
import { join } from 'path';
import { LoggingInterceptor } from './interceptor/logging.interceptor';
import { MapTestInterceptor } from './interceptor/map-test.interceptor';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    cors: true,
  });

  app.use(
    session({
      secret: 'ke',
      resave: false,
      // cookie: { maxAge: 10000 },
      saveUninitialized: false,
    }),
  );

  // app.useGlobalInterceptors(new LoggingInterceptor());
  // app.useGlobalInterceptors(new MapTestInterceptor());

  app.useGlobalPipes(new ValidationPipe());

  app.useStaticAssets(join(process.cwd(), 'public'), {
    prefix: '/static',
  });
  // app.setBaseViewsDir(join(__dirname, '..', 'views'));

  // app.setViewEngine('hbs');

  await app.listen(3001);
}
bootstrap();
