import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';
import { UserService } from 'src/user/user.service';

@Injectable()
export class PermissionGuard implements CanActivate {
  @Inject(UserService)
  private userService: UserService;

  @Inject(Reflector)
  private reflector: Reflector;

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request: Request = context.switchToHttp().getRequest();

    const user = (request as any).user;
    console.log('user: ', user);

    if (!user) {
      throw new UnauthorizedException('用户未登录');
    }

    const foundUser = await this.userService.findByUsername(user.username);
    console.log('foundUser: ', foundUser);

    const permission = this.reflector.get('permission', context.getHandler());

    if (foundUser.permissions.some((item) => item.name === permission)) {
      return true;
    } else {
      throw new UnauthorizedException('没有权限访问接口');
    }
  }
}