import { Schema } from '@nestjs/mongoose';

@Schema()
export class Friend {
  username: string;
  email: string;
}
