import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { UserEntity, UserSchema } from './entities/user.entity'; 
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [
    AuthModule,
    MongooseModule.forFeature([{ name: UserEntity.name, schema: UserSchema, collection:'users' }]), 
  ],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}