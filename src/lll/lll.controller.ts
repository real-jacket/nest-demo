import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Inject,
} from '@nestjs/common';
import { LllService } from './lll.service';
import { CreateLllDto } from './dto/create-lll.dto';
import { UpdateLllDto } from './dto/update-lll.dto';
import {
  LllModuleOptions,
  MODULE_OPTIONS_TOKEN,
  OPTIONS_TYPE,
} from './lll.module-definition';

@Controller('lll')
export class LllController {
  constructor(private readonly lllService: LllService) {}

  @Inject(MODULE_OPTIONS_TOKEN)
  private options: typeof OPTIONS_TYPE;

  @Post()
  create(@Body() createLllDto: CreateLllDto) {
    return this.lllService.create(createLllDto);
  }

  @Get()
  findAll() {
    console.log('ll module data: ', this.options);
    return this.lllService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.lllService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateLllDto: UpdateLllDto) {
    return this.lllService.update(+id, updateLllDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.lllService.remove(+id);
  }
}
