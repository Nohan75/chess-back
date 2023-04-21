import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { partyDocument } from './entities/party.entity';
import { InjectModel } from '@nestjs/mongoose';
import { JwtService } from '@nestjs/jwt';
import { CreatePartyDto } from './dto/create-party.dto';
import { JoinPartyDto } from './dto/join-party.dto';
import { StartPartyDto } from './dto/start-party.dto';

@Injectable()
export class PartiesService {
  constructor(
    @InjectModel('Party') private readonly partyModel: Model<partyDocument>,
    private readonly jwtService: JwtService,
  ) {}

  async create(createPartyDto: CreatePartyDto) {
    return await this.partyModel.create(createPartyDto);
  }

  async join(joinPartyDto: JoinPartyDto) {
    return this.partyModel.findOneAndUpdate(
      { _id: joinPartyDto.partyId },
      { $push: { players: joinPartyDto.userId } },
      { new: true },
    );
  }

  async leave(joinPartyDto: JoinPartyDto) {
    return this.partyModel.findOneAndUpdate(
      { _id: joinPartyDto.partyId },
      { $pull: { players: joinPartyDto.userId } },
      { new: true },
    );
  }

  async start(startPartyDto: StartPartyDto) {
    return this.partyModel.findOneAndUpdate(
      { _id: startPartyDto.partyId },
      { $set: { isStarted: true } },
      { new: true },
    );
  }

  async finish(startPartyDto: StartPartyDto) {
    return this.partyModel.findOneAndUpdate(
      { _id: startPartyDto.partyId },
      { $set: { isFinished: true } },
      { new: true },
    );
  }
}
