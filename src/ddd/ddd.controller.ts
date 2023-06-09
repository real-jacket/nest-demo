import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Inject,
  UseInterceptors,
} from '@nestjs/common';
import { DddService } from './ddd.service';
import { CreateDddDto } from './dto/create-ddd.dto';
import { UpdateDddDto } from './dto/update-ddd.dto';
import { MapTestInterceptor } from 'src/interceptor/map-test.interceptor';
import { TimeoutInterceptor } from 'src/interceptor/timeout.interceptor';

@Controller('ddd')
export class DddController {
  constructor(
    private readonly dddService: DddService,
    @Inject('CONFIG_OPTIONS') private configOptions: Record<string, any>,
  ) {}

  @Post()
  create(@Body() createDddDto: CreateDddDto) {
    return this.dddService.create(createDddDto);
  }

  @Get()
  @UseInterceptors(MapTestInterceptor)
  findAll() {
    console.log(this.configOptions);
    return this.dddService.findAll();
  }

  @Get(':id')
  @UseInterceptors(TimeoutInterceptor)
  async findOne(@Param('id') id: string) {
    await new Promise((resolve) => setTimeout(resolve, 4000));
    return this.dddService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDddDto: UpdateDddDto) {
    return this.dddService.update(+id, updateDddDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.dddService.remove(+id);
  }
}
