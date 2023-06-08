import { DynamicModule, Module } from '@nestjs/common';
import { DddService } from './ddd.service';
import { DddController } from './ddd.controller';

@Module({})
export class DddModule {
  static register(options: Record<string, any>): DynamicModule {
    return {
      module: DddModule,
      controllers: [DddController],
      providers: [
        {
          provide: 'CONFIG_OPTIONS',
          useValue: options,
        },
        DddService,
      ],
      exports: [],
    };
  }
}
