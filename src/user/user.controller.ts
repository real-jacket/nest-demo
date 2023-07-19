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
      const token = await this.jwtService.signAsync({
        user: {
          // id: foundUser.id,
          username: foundUser.username,
          roles: foundUser.roles,
        },
      });

      res.setHeader('authorization', 'bearer ' + token);

      return 'login success';
    } else {
      return 'login fail';
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
