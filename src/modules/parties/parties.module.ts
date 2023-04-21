import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PartySchema } from './entities/party.entity';
import { PartiesController } from './parties.controller';
import { PartiesService } from './parties.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Party', schema: PartySchema }]),
  ],
  controllers: [PartiesController],
  providers: [PartiesService],
  exports: [PartiesService],
})
export class PartiesModule {}
