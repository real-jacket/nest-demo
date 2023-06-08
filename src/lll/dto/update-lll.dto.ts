import { PartialType } from '@nestjs/mapped-types';
import { CreateLllDto } from './create-lll.dto';

export class UpdateLllDto extends PartialType(CreateLllDto) {}
