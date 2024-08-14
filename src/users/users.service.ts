import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserEntity } from './entities/user.entity'; // Certifique-se de que o caminho está correto
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(UserEntity.name) private readonly userModel: Model<User>
  ) {}

  async findAll(): Promise<User[]> {
    const users = await this.userModel.find().exec(); // Adicione exec() para garantir a execução da query
    return users;
  }
  async create(createUserDto: CreateUserDto): Promise<User> {
    const createUser = new this.userModel(createUserDto);
    return createUser.save();
  }
  // Outros métodos do serviço podem ser adicionados aqui
}
