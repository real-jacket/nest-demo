import { Injectable } from '@nestjs/common';
import { CreateLllDto } from './dto/create-lll.dto';
import { UpdateLllDto } from './dto/update-lll.dto';

@Injectable()
export class LllService {
  create(createLllDto: CreateLllDto) {
    return 'This action adds a new lll';
  }

  findAll() {
    return `This action returns all lll`;
  }

  findOne(id: number) {
    return `This action returns a #${id} lll`;
  }

  update(id: number, updateLllDto: UpdateLllDto) {
    return `This action updates a #${id} lll`;
  }

  remove(id: number) {
    return `This action removes a #${id} lll`;
  }
}
