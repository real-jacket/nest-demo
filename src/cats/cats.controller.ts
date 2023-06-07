import {
  Body,
  Controller,
  Get,
  Post,
  SetMetadata,
  UseGuards,
  UseInterceptors,
  Headers,
  Ip,
  Session,
} from '@nestjs/common';
import { CatsService } from './cats.service';
import { Cat } from './interface/cat.interface';
import { CreateCatDto } from './dto/create-cat.dto';
import { LoggingInterceptor } from '../interceptor/logging.interceptor';
import { AppGuard } from '../guard/app.guard';
import { Bbb } from '../decorator/bbb.decorator';
import { MyHeader } from '../decorator/my-header.decorator';

@UseInterceptors(LoggingInterceptor)
@Controller('cats')
@Bbb('user')
export class CatsControllers {
  constructor(private catsService: CatsService) {}

  @Post()
  async create(@Body() createCatDto: CreateCatDto) {
    this.catsService.create(createCatDto);
  }

  @Get()
  @UseGuards(AppGuard)
  @Bbb('admin')
  async findAll(
    @Headers('Accept') accept: string,
    @MyHeader() headers: Record<string, any>,
  ): Promise<Cat[]> {
    console.log('accept: ', accept);
    console.log('headers: ', headers);

    return this.catsService.findAll();
  }

  @Get('/ip')
  ip(@Ip() ip: string) {
    console.log('ip: ', ip);
  }

  @Get('/session')
  session(@Session() session) {
    console.log('session: ', session);
    if (!session.count) {
      session.count = 0;
    }

    session.count = session.count + 1;

    return session.count;
  }
}
