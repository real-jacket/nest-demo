import { SetMetadata } from '@nestjs/common';

export const Bbb = (...args: string[]) => SetMetadata('roles', args);
