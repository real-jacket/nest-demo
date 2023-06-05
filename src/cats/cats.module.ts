import { Module } from '@nestjs/common';
import { CatsControllers } from './cats.controller';
import { CatsService } from './cats.service';

@Module({
  controllers: [CatsControllers],
  providers: [CatsService],
})
export class CatsModule {}
