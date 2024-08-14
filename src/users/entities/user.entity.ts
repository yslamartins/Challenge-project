import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export enum Role {
  Admin = 0,
  Manager = 1,
  User = 2,
}

export interface User extends Document {
  name: string;
  email: string;
  password: string;
  role: Role;
}

@Schema({
  timestamps: true,
})
export class UserEntity {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({ type: Number, enum: Role })
  role: Role;
}

export const UserSchema = SchemaFactory.createForClass(UserEntity);
