import { Body, Controller, HttpStatus, Post, Res } from '@nestjs/common';
import { CreatePartyDto } from './dto/create-party.dto';
import { PartiesService } from './parties.service';
import { JoinPartyDto } from './dto/join-party.dto';
import { StartPartyDto } from './dto/start-party.dto';

@Controller('parties')
export class PartiesController {
  constructor(private readonly partiesService: PartiesService) {}

  @Post('/create')
  async create(@Res() res, @Body() createPartyDto: CreatePartyDto) {
    const party = await this.partiesService.create(createPartyDto);
    return res.status(HttpStatus.OK).json({
      success: true,
      message: 'Party created successfully',
      party,
    });
  }

  @Post('/join')
  async join(@Res() res, @Body() joinPartyDto: JoinPartyDto) {
    const party = await this.partiesService.join(joinPartyDto);
    return res.status(HttpStatus.OK).json({
      success: true,
      message: 'Party joined successfully',
      party,
    });
  }

  @Post('/leave')
  async leave(@Res() res, @Body() joinPartyDto: JoinPartyDto) {
    const party = await this.partiesService.leave(joinPartyDto);
    return res.status(HttpStatus.OK).json({
      success: true,
      message: 'Party left successfully',
      party,
    });
  }

  @Post('/start')
  async start(@Res() res, @Body() startPartyDto: StartPartyDto) {
    const party = await this.partiesService.start(startPartyDto);
    return res.status(HttpStatus.OK).json({
      success: true,
      message: 'Party started successfully',
      party,
    });
  }

  @Post('/finish')
  async finish(@Res() res, @Body() startPartyDto: StartPartyDto) {
    const party = await this.partiesService.finish(startPartyDto);
    return res.status(HttpStatus.OK).json({
      success: true,
      message: 'Party finished successfully',
      party,
    });
  }
}
