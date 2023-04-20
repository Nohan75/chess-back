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
}
