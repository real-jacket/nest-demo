import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';

@Injectable()
export class AaaPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    console.log('AaaPipe value, metadata: ', value, metadata);

    return 'aaa';
  }
}
