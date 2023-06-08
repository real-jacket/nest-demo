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
import { DddModule } from './ddd/ddd.module';
import { LllModule } from './lll/lll.module';

@Module({
  imports: [
    CatsModule,
    MmmModule,
    NnnModule,
    DddModule.register({
      ddd: 1,
      ddd2: 2,
    }),
    // LllModule.register({
    //   aaa: 1,
    //   bbb: 'sa',
    // }),
    LllModule.forRoot({
      aaa: 1,
      bbb: 'sa',
      isGlobal: true,
    }),
  ],
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
