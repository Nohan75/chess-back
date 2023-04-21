import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { Friend } from './friend.entity';

export type userDocument = User & Document;

@Schema()
export class User {
  @Prop({ required: true })
  username: string;

  @Prop({ required: true })
  email: string;

  @Prop({ required: true })
  password: string;
  @Prop({ required: true, type: [{ username: String, email: String }] })
  friends: Friend[];

  @Prop({ required: true, type: [{ username: String, email: String }] })
  friendRequests: Friend[];

  @Prop({ default: new Date() })
  createdAt: Date;

  @Prop({ default: 200 })
  money: number;
}

export const UserSchema = SchemaFactory.createForClass(User);
