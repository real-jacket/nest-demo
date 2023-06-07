import { Controller, Get, HostParam, Render, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';

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
}
