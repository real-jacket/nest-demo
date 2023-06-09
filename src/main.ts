import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import * as session from 'express-session';
import { join } from 'path';
import { LoggingInterceptor } from './interceptor/logging.interceptor';
import { MapTestInterceptor } from './interceptor/map-test.interceptor';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.use(
    session({
      secret: 'ke',
      cookie: { maxAge: 10000 },
    }),
  );

  // app.useGlobalInterceptors(new LoggingInterceptor());
  // app.useGlobalInterceptors(new MapTestInterceptor());

  app.useStaticAssets(join(__dirname, '..', 'public'));
  app.setBaseViewsDir(join(__dirname, '..', 'views'));

  app.setViewEngine('hbs');

  await app.listen(3001);
}
bootstrap();
