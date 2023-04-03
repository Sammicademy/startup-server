import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class LoginAuthDto {
  @IsString()
  @IsEmail()
  @IsNotEmpty()
  email: string;

  password: string;

  fullName: string;

  avatar: string;
}
