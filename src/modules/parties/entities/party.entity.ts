import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { User } from '../../users/entities/user.entity';

export type partyDocument = Party & Document;

@Schema()
export class Party {
  @Prop({ required: true })
  id: string;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  isPublic: boolean;

  @Prop({ required: true })
  players: User[];

  @Prop({ required: true })
  createdAt: Date;

  @Prop({ required: true })
  moneyToWin: number;

  @Prop({ required: true })
  isWaiting: boolean;

  @Prop({ required: true })
  isStarted: boolean;

  @Prop({ required: true })
  isFinished: boolean;

  @Prop({ required: true })
  winner: User;
}

export const PartySchema = SchemaFactory.createForClass(Party);
