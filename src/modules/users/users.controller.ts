import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Res,
  HttpStatus,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { FriendRequestDto } from './dto/friend-request.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('/register')
  async create(@Res() res, @Body() createUserDto: CreateUserDto) {
    const userExists = await this.usersService.userAlreadyExists(
      createUserDto.email,
    );
    if (userExists) {
      return res.status(HttpStatus.BAD_REQUEST).json({
        success: false,
        message: 'User already exists',
      });
    } else {
      const user = await this.usersService.create(createUserDto);
      return res.status(HttpStatus.OK).json({
        success: true,
        message: 'User created successfully',
        user,
      });
    }
  }

  @Post('/friend-request')
  async sendFriendRequest(
    @Res() res,
    @Body() friendRequestDto: FriendRequestDto,
  ) {
    const userExists = await this.usersService.userAlreadyExists(
      friendRequestDto.email,
    );
    if (userExists) {
      await this.usersService.sendFriendRequest(friendRequestDto);
      return res.status(HttpStatus.OK).json({
        success: true,
        message: 'Friend request sent successfully',
      });
    } else {
      return res.status(HttpStatus.BAD_REQUEST).json({
        success: false,
        message: 'User does not exist',
      });
    }
  }

  @Post('/accept-friend-request')
  async acceptFriendRequest(
    @Res() res,
    @Body() friendRequestDto: FriendRequestDto,
  ) {
    const userExists = await this.usersService.userAlreadyExists(
      friendRequestDto.email,
    );
    if (userExists) {
      await this.usersService.acceptFriendRequest(friendRequestDto);
      return res.status(HttpStatus.OK).json({
        success: true,
        message: 'Friend request accepted successfully',
      });
    } else {
      return res.status(HttpStatus.BAD_REQUEST).json({
        success: false,
        message: 'User does not exist',
      });
    }
  }

  @Post('/decline-friend-request')
  async declineFriendRequest(
    @Res() res,
    @Body() friendRequestDto: FriendRequestDto,
  ) {
    const userExists = await this.usersService.userAlreadyExists(
      friendRequestDto.email,
    );
    if (userExists) {
      await this.usersService.declineFriendRequest(friendRequestDto);
      return res.status(HttpStatus.OK).json({
        success: true,
        message: 'Friend request declined successfully',
      });
    } else {
      return res.status(HttpStatus.BAD_REQUEST).json({
        success: false,
        message: 'User does not exist',
      });
    }
  }

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }

  @Get('/me/:email')
  async me(@Param('email') email: string) {
    return this.usersService.me(email);
  }
}
