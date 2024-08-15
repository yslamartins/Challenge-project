import { ApiProperty } from "@nestjs/swagger";
import { Role } from "../entities/user.entity";
import { IsNotEmpty, IsEnum, IsString, IsEmail, IsStrongPassword } from "class-validator";

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
    @ApiProperty({example: 'John'})
    readonly name: string;

    @IsNotEmpty()
    @IsEmail({}, { message: 'Please provide a valid email address.' })
    @ApiProperty({example: 'john@example.com'})
    readonly email: string;
    
    @IsNotEmpty()
    @IsStrongPassword({
    minLength: 8,
    minLowercase: 1,
    minUppercase: 1,
    minNumbers: 1,
    minSymbols: 1,
  }, { message: 'Password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, one number, and one special character.' })
  @ApiProperty({ example: 'Pass123!',
    description: 'Password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, one number, and one special character.'
  })
  readonly password: string;
    
    @IsNotEmpty()
    @IsEnum(Role, {message: 'Please enter the correct role.'})
    @ApiProperty({
        example: 0,
        description: 'Role of the user (0: Admin, 1: Manager, 2: User)',
      })
      readonly role: Role;
}
