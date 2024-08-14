import { Role } from "../entities/user.entity";

export class CreateUserDto {
    readonly name: string;
    readonly email: string;
    readonly password: string;
    role: Role[];
}
