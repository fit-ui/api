import { IsEmail, MinLength, MaxLength } from 'class-validator';

export class LoginUserDto {
  @IsEmail()
  email: string;

  @MinLength(8)
  @MaxLength(16)
  password: string;
}
