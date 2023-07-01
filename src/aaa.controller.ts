import {
  Body,
  Controller,
  Get,
  HostParam,
  HttpException,
  HttpStatus,
  Logger,
  Param,
  ParseArrayPipe,
  ParseBoolPipe,
  ParseFloatPipe,
  ParseIntPipe,
  Post,
  Query,
  Render,
  Req,
  Res,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { Ccc } from './decorator/ccc.decorator';
import { MyQuery } from './decorator/my-query.decorator';
import { AaaPipe } from './pipe/aaa.pipe';
import { CreateDddDto } from './ddd/dto/create-ddd.dto';
import { MyValidationPipe } from './pipe/my-validation.pipe';
import { AppController } from './app.controller';
import { LoginGuard } from './guard/login.guard';

@Controller({ host: ':host.0.0.1', path: 'aaa' })
export class AaaController {
  private logger = new Logger();

  @Get('bbb')
  @UseGuards(LoginGuard)
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
  getHello5(
    @Query(
      'aaa',
      new ParseIntPipe({
        // errorHttpStatusCode: HttpStatus.NOT_FOUND,
        exceptionFactory: (msg) => {
          console.log('msg: ', msg);
          throw new HttpException('xxx ' + msg, HttpStatus.NOT_IMPLEMENTED);
        },
      }),
    )
    aaa,
    @MyQuery(
      'bbb',
      // ParseArrayPipe,
      new ParseArrayPipe({
        items: Number,
        optional: true,
      }),
    )
    bbb: number[],
  ) {
    console.log('bbb: ', bbb);
    return `query: ${aaa + 1}, my-query: ${bbb?.reduce(
      (total, item) => total + item,
      0,
    )}`;
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

  @Get('nnn/:bbb')
  nnn(@Query('aaa', AaaPipe) aaa: string, @Param('bbb', AaaPipe) bbb: number) {
    return aaa + bbb;
  }

  @Post('ooo')
  ooo(@Body(ValidationPipe) obj: CreateDddDto) {
    console.log(obj);
  }

  @Get('log')
  log() {
    this.logger.debug('aaa', AaaController.name);
    this.logger.error('bbb', AaaController.name);
    this.logger.log('ccc', AaaController.name);
    this.logger.verbose('ddd', AppController.name);
    this.logger.warn('eee', AaaController.name);

    return 'log hello';
  }
}
