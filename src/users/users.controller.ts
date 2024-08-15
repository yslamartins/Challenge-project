import { Body, Controller, Get, Param, Post, Put} from '@nestjs/common';
import { UsersService } from './users.service';
import { User, UserEntity } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { ApiBody, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UpdateUserDto } from './dto/update-user.dto';

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

@Get('id')
@ApiOperation({ summary: 'Get user by id' })
async getUser(
  @Param('id')
  id: string
): Promise<User>{
  return this.usersService.findById(id);
}
@Put(':id')
@ApiOperation({ summary: 'Update user by id' })
@ApiParam({ name: 'id', description: 'User ID', type: String })
@ApiBody({ type: UpdateUserDto })
@ApiResponse({ status: 200, description: 'User successfully updated', type: UserEntity})
@ApiResponse({ status: 404, description: 'User not found' })
async updateUser(
  @Param('id') id: string,
  @Body() user: UpdateUserDto,
): Promise<User> {
  return this.usersService.updateById(id, user);
}

}
