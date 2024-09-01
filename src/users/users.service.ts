import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { User, UserEntity } from './entities/user.entity'; // Certifique-se de que o caminho está correto
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Query } from 'express-serve-static-core';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(UserEntity.name) private readonly userModel: Model<User>,
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
    const keyword = query.keyword
      ? {
          name: {
            $regex: query.keyword,
            $options: 'i', // Insensível a maiúsculas e minúsculas
          },
        }
      : {};

    // Consulta ao banco de dados com paginação
    const users = await this.userModel
      .find({ ...keyword })
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
    const { password, ...rest } = createUserDto;
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new this.userModel({
      ...rest,
      password: hashedPassword,
      registerate: new Date(),
    });

    return newUser.save();
  }
  /**
   * Return a user by their ID.
   * @param id - The ID of the user to retrieve.
   * @returns A promise that resolves to the User object if found, or null.
   */
  async findById(id: string): Promise<User> {
    const isValidId = mongoose.isValidObjectId(id);
    if (!isValidId) {
      throw new BadRequestException('Please enter a correct id');
    }

    const user = await this.userModel.findById(id).exec();

    if (!user) {
      throw new NotFoundException('User not found.');
    }
    return user;
  }
  async updateById(id: string, user: UpdateUserDto): Promise<User> {
    const isValidId = mongoose.isValidObjectId(id);
    if (!isValidId) {
      throw new BadRequestException('Please enter a correct id');
    }
    return await this.userModel
      .findByIdAndUpdate(id, user, {
        new: true,
        runValidators: true,
      })
      .exec();
  }
  
  /**
   * Deletes a user by their ID.
   * @param id - The ID of the user to delete.
   * @returns A promise that resolves to an object containing a success message.
   * @throws BadRequestException if the ID is invalid.
   * @throws NotFoundException if the user is not found.
   */
  async deleteById(id: string): Promise<{ message: string }> {
    // Verifica se o ID é um ObjectId válido
    const isValidId = mongoose.isValidObjectId(id);
    if (!isValidId) {
      throw new BadRequestException('Please enter a correct id');
    }

    // Tenta encontrar e deletar o usuário pelo ID
    const user = await this.userModel.findByIdAndDelete(id).exec();

    // Verifica se o usuário foi encontrado
    if (!user) {
      throw new NotFoundException('User not found');
    }

    // Retorna uma mensagem de sucesso
    return { message: `Usuário com ID ${id} excluído com sucesso.` };
  }
}
