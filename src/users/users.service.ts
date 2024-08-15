import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserEntity } from './entities/user.entity'; // Certifique-se de que o caminho está correto
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(UserEntity.name) private readonly userModel: Model<User>
  ) {}
  /**
   * Retrieves all users from the database.
   * @returns A promise that resolves to an array of User objects.
   */
  async findAll(): Promise<User[]> {
    const users = await this.userModel.find().exec();
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
