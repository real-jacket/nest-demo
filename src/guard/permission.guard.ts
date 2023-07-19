import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';
import { RedisService } from 'src/redis/redis.service';
import { UserService } from 'src/user/user.service';

@Injectable()
export class PermissionGuard implements CanActivate {
  @Inject(UserService)
  private userService: UserService;

  @Inject(Reflector)
  private reflector: Reflector;

  @Inject(RedisService)
  private redisService: RedisService;

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request: Request = context.switchToHttp().getRequest();

    const user = request.user;

    if (!user) {
      throw new UnauthorizedException('用户未登录');
    }

    const redis_key = `user_${user.username}_permissions`;

    let permissions = await this.redisService.listGet(redis_key);

    if (permissions.length === 0) {
      // const foundUser = await this.userService.findByUsername(user.username);
      // permissions = foundUser.permissions.map((item) => item.name);

      const roles = await this.userService.findRolesByIds(
        request.user.roles.map((item) => item.id),
      );

      permissions = roles.reduce((total, current) => {
        total.push(...current.permissions.map((item) => item.name));
        return total;
      }, []);

      this.redisService.listSet(redis_key, permissions, 60 * 30);
    }

    const permission = this.reflector.get('permission', context.getHandler());

    if (permissions.some((item) => item === permission)) {
      return true;
    } else {
      throw new UnauthorizedException('没有权限访问接口');
    }
  }
}
