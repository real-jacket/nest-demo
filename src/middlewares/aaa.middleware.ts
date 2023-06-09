import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';

@Injectable()
export class AaaMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: () => void) {
    console.log('aaa log before: ');
    next();
    console.log('aaa log after: ');
  }
}
