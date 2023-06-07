import {
  Controller,
  Get,
  HostParam,
  ParseIntPipe,
  Query,
  Render,
  Req,
  Res,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { Ccc } from './decorator/ccc.decorator';
import { MyQuery } from './decorator/my-query.decorator';

@Controller({ host: ':host.0.0.1', path: 'aaa' })
export class AaaController {
  @Get('bbb')
  hello(): string {
    return 'hello';
  }

  @Get('ccc')
  ccc(@Req() req: Request) {
    console.log(req.hostname);
    console.log(req.url);
  }

  @Get('ddd')
  ddd(@Res() res: Response) {
    res.end('ddd');
  }

  @Get('eee')
  eee(@HostParam('host') host) {
    return host;
  }

  @Get('user')
  @Render('user')
  user() {
    return { name: 'ke', age: 12 };
  }

  @Get('hello4')
  getHello4(@Ccc() c) {
    return c;
  }

  @Get('hello5')
  getHello5(@Query('aaa') aaa, @MyQuery('bbb') bbb) {
    return `query: ${aaa}, my-query: ${bbb}`;
  }

  @Get('hello6')
  getHello6(
    @Query('aaa', new ParseIntPipe()) aaa,
    @MyQuery('bbb', new ParseIntPipe()) bbb,
  ) {
    console.log('aaa: ', aaa);
    console.log('bbb: ', bbb);
    return `query: ${aaa}, my-query: ${bbb}`;
  }
}
