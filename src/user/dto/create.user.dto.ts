import { MinLength, MaxLength } from 'class-validator';

import { LoginUserDto } from './login.user.dto';

export class CreateUserDto extends LoginUserDto {
  @MinLength(2)
  @MaxLength(10)
  username: string;
}
