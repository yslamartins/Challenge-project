import { ApiProperty } from "@nestjs/swagger";
import { Role } from "../entities/user.entity";

export class CreateUserDto {
    @ApiProperty({example: 'John'})
    readonly name: string;

    @ApiProperty({example: 'john@example.com'})
    readonly email: string;

    @ApiProperty({example: 'pass123'})
    readonly password: string;

    @ApiProperty({
        example: 0,
        description: 'Role of the user (0: Admin, 1: Manager, 2: User)',
      })
      Role: number;
}
