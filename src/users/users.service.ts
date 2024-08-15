import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserEntity } from './entities/user.entity'; // Certifique-se de que o caminho está correto
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Query } from 'express-serve-static-core';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(UserEntity.name) private readonly userModel: Model<User>
  ) {}
  /**
   * Retrieves all users from the database.
   * @returns A promise that resolves to an array of User objects.
   */
  async findAll(query: Query): Promise<User[]> {
    // Definições de paginação
    const resPerPage = 5; // Quantidade de itens por página
    const currentPage = Number(query.page) || 1; // Página atual, padrão para 1 se não especificado
    const skip = resPerPage * (currentPage - 1); // Calcula o número de documentos a serem pulados

    // Construção do filtro de pesquisa
    const keyword = query.keyword ? {
      name: {
        $regex: query.keyword,
        $options: 'i' // Insensível a maiúsculas e minúsculas
      }
    } : {};

    // Consulta ao banco de dados com paginação
    const users = await this.userModel.find({...keyword})
      .skip(skip) // Pular documentos conforme a página atual
      .limit(resPerPage) // Limitar a quantidade de documentos retornados
      .exec();

    return users;
  }
  /**
   * Creates a new user and saves it to the database.
   * @param createUserDto - Data Transfer Object containing user data.
   * @returns A promise that resolves to the created User object.
   */
  async create(createUserDto: CreateUserDto): Promise<User> {
    const createUser = new this.userModel(createUserDto);
    return createUser.save();
  }
  /**
   * Return a user by their ID.
   * @param id - The ID of the user to retrieve.
   * @returns A promise that resolves to the User object if found, or null.
   */
  async findById(id: string): Promise<User> {
    const user = await this.userModel.findById(id).exec(); 

    if(!user){
      throw new NotFoundException('User not found.')
    }
    return user;
  }
  async updateById(id: string, user: UpdateUserDto): Promise<User> {
    return await this.userModel.findByIdAndUpdate(id, user, {
      new: true,
      runValidators: true,
    }).exec()
  }
  async deleteById(id: string): Promise<User> {
    return await this.userModel.findByIdAndDelete(id).exec();
  }
}
