import { Body, Controller, Get, Post} from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';


@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}
@Get()
async getAllUsers(): Promise<User[]>{
  return this.usersService.findAll()
}

@Post()
async createUser(
  @Body()
   user: CreateUserDto,
) : Promise<User> {
  return this.usersService.create(user);
}
  

}
