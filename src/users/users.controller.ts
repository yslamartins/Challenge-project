import { Body, Controller, Get, Post} from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}
@Get()
@ApiOperation({ summary: 'Get all users' })
async getAllUsers(): Promise<User[]>{
  return this.usersService.findAll()
}

@Post()
@ApiOperation({ summary: 'Create a new user' })
@ApiResponse({ status: 201, description: 'The user has been successfully created.', type: CreateUserDto })
@ApiResponse({ status: 400, description: 'Bad Request.' })
async createUser(
  @Body() createUserDto: CreateUserDto, // Nome do parâmetro ajustado para `createUserDto` para clareza
): Promise<User> {
  return this.usersService.create(createUserDto);
}
}
