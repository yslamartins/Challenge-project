import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';


export class SignUpDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsEmail({}, { message: 'Pleas enter correct email'})
  email: string;

  @IsNotEmpty()
  @MinLength(6)
  password: string;

}