import { Module } from '@nestjs/common';
import { LllService } from './lll.service';
import { LllController } from './lll.controller';
import { ConfigurableModuleClass } from './lll.module-definition';

@Module({
  controllers: [LllController],
  providers: [LllService],
  exports: [LllService],
})
export class LllModule extends ConfigurableModuleClass {}
