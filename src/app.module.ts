import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CatsModule } from './cats/cats.module';
import { logger } from './middlewares/logger.middleware';
// import { LoggerMiddleware } from './middlewares/logger.middleware';
import { AaaController } from './aaa.controller';
import { MmmModule } from './mmm/mmm.module';
import { NnnModule } from './nnn/nnn.module';

@Module({
  imports: [CatsModule, MmmModule, NnnModule],
  controllers: [AppController, AaaController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(
        // LoggerMiddleware
        logger,
      )
      .forRoutes({
        path: 'cats',
        method: RequestMethod.ALL,
      });
  }
}
