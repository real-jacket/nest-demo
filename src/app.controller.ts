import {
  Controller,
  Get,
  UseFilters,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AppService } from './app.service';
import { Ddd } from './decorator/ddd.decorator';
import { XxxFilter } from './xxx.filter';
import { XxxException } from './XxxException';
import { AaaGuard } from './guard/aaa.guard';
import { Roles } from './decorator/roles.decorator';
import { Role } from './role';
import { CatchErrorTestInterceptor } from './interceptor/catch-error-test.interceptor';

@Controller()
// @Ddd()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @UseFilters(XxxFilter)
  @UseGuards(AaaGuard)
  @Roles(Role.Admin)
  getHello(): string {
    throw new XxxException('aaa', 'bbb');
    return this.appService.getHello();
  }
}
