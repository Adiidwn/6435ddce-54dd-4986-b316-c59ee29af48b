import { IsEmail, IsNotEmpty } from 'class-validator';

export class AuthLoginDto {
  id: string;
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  password: string;
}

export class AuthRegisterDto {
  id: string;
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  password: string;

  @IsNotEmpty()
  confirmPassword: string;

  @IsEmail()
  email: string;
}
