import { IsNotEmpty, Length } from 'class-validator';
import { Role } from '../entities/role.entity';

export class LoginDto {
  @IsNotEmpty()
  username: string;

  @IsNotEmpty()
  @Length(1, 50)
  password: string;
}
