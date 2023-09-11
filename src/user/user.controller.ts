import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Inject,
  Res,
  ValidationPipe,
  Query,
  UnauthorizedException,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { JwtService } from '@nestjs/jwt';
import { Response } from 'express';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Inject(JwtService)
  private jwtService: JwtService;

  @Post('login')
  async login(
    @Body(ValidationPipe) user: LoginDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const foundUser = await this.userService.login(user);
    console.log('foundUser: ', foundUser);

    if (foundUser) {
      const access_token = await this.jwtService.signAsync(
        {
          user: {
            userId: foundUser.id,
            username: foundUser.username,
            roles: foundUser.roles,
          },
        },
        {
          expiresIn: '30m',
        },
      );

      const refresh_token = await this.jwtService.signAsync(
        {
          userId: foundUser.id,
        },
        {
          expiresIn: '7d',
        },
      );

      return {
        access_token,
        refresh_token,
      };
    } else {
      return 'login fail';
    }
  }

  @Get('refresh')
  async refresh(@Query('refresh_token') refreshToken: string) {
    try {
      const data = this.jwtService.verify(refreshToken);

      const user = await this.userService.findOne(data.userId);

      const access_token = this.jwtService.sign(
        {
          user: {
            userId: user.id,
            username: user.username,
            roles: user.roles,
          },
        },
        {
          expiresIn: '30m',
        },
      );

      const refresh_token = this.jwtService.sign(
        {
          userId: user.id,
        },
        {
          expiresIn: '7d',
        },
      );

      return {
        access_token,
        refresh_token,
      };
    } catch (error) {
      throw new UnauthorizedException('token 已失效，请重新登录');
    }
  }

  @Post('register')
  register(@Body(ValidationPipe) user: RegisterDto) {
    return this.userService.register(user);
  }

  @Get('init')
  async initData() {
    await this.userService.InitData();
    return 'init data done';
  }
}
