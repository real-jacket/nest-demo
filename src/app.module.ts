import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
  ValidationPipe,
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
import { AaaMiddleware } from './middlewares/aaa.middleware';
import { APP_PIPE } from '@nestjs/core';
import { MyValidationPipe } from './pipe/my-validation.pipe';
import { UploadController } from './upload/upload.controller';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user/entities/user.entity';
import { createClient } from 'redis';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    JwtModule.register({
      secret: 'ke',
      signOptions: {
        expiresIn: '7d',
      },
    }),
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
    //   isGlobal: false,
    // }),
    LllModule.registerAsync({
      useFactory: () => {
        return {
          aaa: 1,
          bbb: 'xx',
          xxx: '12',
        };
      },
      isGlobal: true,
      isFake: false,
      inject: [],
    }),
    UserModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'ke',
      database: 'typeorm_test',
      synchronize: true,
      logging: true,
      entities: [User],
      poolSize: 10,
      connectorPackage: 'mysql2',
      extra: {
        authPlugin: 'sha256_password',
      },
    }),
  ],
  controllers: [AppController, AaaController, UploadController],
  providers: [
    AppService,
    {
      provide: 'REDIS_CLIENT',
      async useFactory() {
        const client = createClient({
          socket: {
            host: 'localhost',
            port: 6379,
          },
        });

        await client.connect();
        return client;
      },
    },
    {
      provide: 'validation_options',
      useFactory() {
        return {
          aaa: 1,
          bbb: 2,
        };
      },
    },
    // {
    //   provide: APP_PIPE,
    //   useClass: MyValidationPipe,
    // },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    // consumer.apply(logger).forRoutes({
    //   path: 'cats',
    //   method: RequestMethod.ALL,
    // });
    // consumer.apply(AaaMiddleware).forRoutes('*');
  }
}
