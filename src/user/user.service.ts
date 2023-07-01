import { HttpException, Injectable, Logger } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import {
  InjectDataSource,
  InjectEntityManager,
  InjectRepository,
} from '@nestjs/typeorm';
import { DataSource, EntityManager, Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { RegisterDto } from './dto/register.dto';
import * as crypto from 'crypto';
import { LoginDto } from './dto/login.dto';

function md5(str: crypto.BinaryLike) {
  const hash = crypto.createHash('md5');
  hash.update(str);

  return hash.digest('hex');
}

@Injectable()
export class UserService {
  @InjectEntityManager()
  private manager: EntityManager;

  @InjectRepository(User)
  private userRepository: Repository<User>;

  @InjectDataSource()
  private dataSource: DataSource;

  private logger = new Logger();

  create(createUserDto: CreateUserDto) {
    this.manager.save(User, createUserDto);
  }

  findAll() {
    // return this.dataSource.getRepository(User).find()
    return this.userRepository.find();
    // return this.manager.find(User);
  }

  findOne(id: number) {
    return this.manager.findOne(User, {
      where: {
        id,
      },
    });
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    this.manager.save(User, {
      id: id,
      ...updateUserDto,
    });
  }

  remove(id: number) {
    this.manager.delete(User, id);
  }

  async register(user: RegisterDto) {
    const foundUser = await this.userRepository.findOneBy({
      username: user.username,
    });

    if (foundUser) {
      throw new HttpException('用户已经存在', 200);
    }

    const newUser = new User();

    newUser.username = user.username;
    newUser.password = md5(user.password);

    try {
      await this.userRepository.save(newUser);

      return '注册成功';
    } catch (e) {
      this.logger.error(e, UserService);
      return '注册失败';
    }
  }

  async login(user: LoginDto) {
    const foundUser = await this.userRepository.findOneBy({
      username: user.username,
    });

    if (!foundUser) {
      throw new HttpException('用户名不存在', 200);
    }

    if (foundUser.password !== md5(user.password)) {
      throw new HttpException('密码错误', 200);
    }

    return foundUser;
  }
}
