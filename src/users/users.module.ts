import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { UserEntity, UserSchema } from './entities/user.entity'; // Certifique-se de que o caminho está correto

@Module({
  imports: [
    MongooseModule.forFeature([{ name: UserEntity.name, schema: UserSchema, collection:'users' }]), // Corrigido: nome do modelo e schema
  ],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}