import {
  Controller,
  Get,
  Inject,
  Res,
  Session,
  UseFilters,
  UseGuards,
  UseInterceptors,
  Headers,
  UnauthorizedException,
} from '@nestjs/common';
import { AppService } from './app.service';
import { Ddd } from './decorator/ddd.decorator';
import { XxxFilter } from './xxx.filter';
import { XxxException } from './XxxException';
import { AaaGuard } from './guard/aaa.guard';
import { Roles } from './decorator/roles.decorator';
import { Role } from './role';
import { CatchErrorTestInterceptor } from './interceptor/catch-error-test.interceptor';
import { JwtService } from '@nestjs/jwt';
import { Response } from 'express';

@Controller()
// @Ddd()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Inject(JwtService)
  private jwtService: JwtService;

  @Get()
  // @UseFilters(XxxFilter)
  // @UseGuards(AaaGuard)
  // @Roles(Role.Admin)
  async getHello() {
    // throw new XxxException('aaa', 'bbb');
    return await this.appService.getHello();
  }

  @Get('sss')
  sss(@Session() session) {
    console.log('session: ', session);
    session.count = session.count ? session.count + 1 : 1;
    return session.count;
  }

  @Get('ttt')
  ttt(
    @Headers('authorization') authorization: string,
    @Res({
      passthrough: true,
    })
    response: Response,
  ) {
    if (authorization) {
      try {
        const token = authorization.split(' ')[1];
        const data = this.jwtService.verify(token);
        console.log('data: ', data);
        const newToken = this.jwtService.sign({
          count: data.count + 1,
        });

        response.setHeader('authorization', 'bearer ' + newToken);

        return data.count + 1;
      } catch (e) {
        console.log(e);
        throw new UnauthorizedException();
      }
    } else {
      const newToken = this.jwtService.sign({ count: 1 });

      response.setHeader('authorization', 'bearer ' + newToken);

      return 1;
    }
  }
}
