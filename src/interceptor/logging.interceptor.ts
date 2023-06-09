import {
  CallHandler,
  ExecutionContext,
  Logger,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, tap } from 'rxjs';
import { AppService } from 'src/app.service';

export class LoggingInterceptor implements NestInterceptor {
  constructor(private appService: AppService) {}

  private readonly logger = new Logger(LoggingInterceptor.name);

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    this.logger.log('Before...');

    const now = Date.now();
    return next
      .handle()
      .pipe(tap(() => this.logger.log(`After... ${Date.now() - now}ms`)));
  }
}
