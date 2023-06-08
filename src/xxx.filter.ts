import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import { XxxException } from './XxxException';
import { Request, Response } from 'express';

@Catch(XxxException)
export class XxxFilter implements ExceptionFilter {
  catch(exception: XxxException, host: ArgumentsHost) {
    console.log(exception, host);

    if (host.getType() === 'http') {
      const ctx = host.switchToHttp();

      const request = ctx.getRequest<Request>();
      const response = ctx.getResponse<Response>();

      response.status(500).json({
        aaa: exception.aaa,
        bbb: exception.bbb,
      });
    } else if (host.getType() === 'ws') {
    } else if (host.getType() === 'rpc') {
    }
  }
}
