import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { Observable } from 'rxjs';
import { Role } from 'src/user/entities/role.entity';

declare module 'express' {
  interface Request {
    user: {
      username: string;
      roles: Role[];
    };
  }
}

@Injectable()
export class LoginGuard implements CanActivate {
  @Inject()
  private reflector: Reflector;

  @Inject(JwtService)
  private jwtService: JwtService;

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request: Request = context.switchToHttp().getRequest();

    const requireLogin = this.reflector.getAllAndOverride('require-login', [
      context.getClass(),
      context.getHandler(),
    ]);

    if (!requireLogin) {
      return true;
    }

    const authorization = request.header('authorization') || '';

    if (!authorization) {
      throw new UnauthorizedException('用户未登录');
    }

    const bearer = authorization.split(' ');

    if (!bearer || bearer.length < 2) {
      throw new UnauthorizedException('登录 token 错误');
    }

    const token = bearer[1];

    try {
      const info = this.jwtService.verify(token);
      console.log('info: ', info);
      request.user = info.user;

      return true;
    } catch (e) {
      throw new UnauthorizedException('登录 token 失效，请重新登录');
    }
  }
}
