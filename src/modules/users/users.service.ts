import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Model } from 'mongoose';
import { User, userDocument } from './entities/user.entity';
import { InjectModel } from '@nestjs/mongoose';
import * as nodemailer from 'nodemailer';
import { JwtService } from '@nestjs/jwt';
import { FriendRequestDto } from './dto/friend-request.dto';
@Injectable()
export class UsersService {
  constructor(
    @InjectModel('User') private readonly userModel: Model<userDocument>,
    private readonly jwtService: JwtService,
  ) {}

  async me(email: string): Promise<User> {
    return this.userModel.findOne({ email });
  }

  async getUserByEmail(email: string): Promise<User> {
    return this.userModel.findOne({ email });
  }

  async userAlreadyExists(email: string): Promise<boolean> {
    const user = await this.getUserByEmail(email);
    return !!user;
  }

  async forgotPassword(email: string): Promise<string> {
    const user = await this.userAlreadyExists(email);
    if (!user) {
      return 'User does not exist';
    }
    const transporter = nodemailer.createTransport({
      host: 'smtp.ethereal.email',
      port: 587,
      auth: {
        user: 'naomi.gislason95@ethereal.email',
        pass: 'gPV6kXTg9NSDmtZ3sS',
      },
    });
    const cryptEmail = Buffer.from(email).toString('base64');
    const url = 'http://localhost:5173/reset-password/' + cryptEmail;
    transporter.sendMail({
      from: '"Nohan Admin" <nohanmarielouise@gmail.com>',
      to: email,
      subject: 'Reset Password',
      text: url,
      html: '<a href={url}>Reset Password</a>',
    });
    return 'Email sent';
  }

  async resetPassword(cryptEmail: string, password: string): Promise<string> {
    const email = Buffer.from(cryptEmail, 'base64').toString('ascii');
    const user = await this.userModel.findOne({ email });
    if (!user) {
      return 'User does not exist';
    }
    user.password = password;
    await user.save();
    return 'Password updated';
  }

  create(createUserDto: CreateUserDto): Promise<User> {
    createUserDto.password = Buffer.from(createUserDto.password).toString(
      'base64',
    );
    const createdUser = new this.userModel(createUserDto);
    return createdUser.save();
  }

  findAll() {
    return this.userModel.find().exec();
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }

  async sendFriendRequest(friendRequestDto: FriendRequestDto): Promise<string> {
    const user = new this.userModel(
      await this.getUserByEmail(friendRequestDto.email),
    );
    const me = await this.me(friendRequestDto.me);
    console.log(me.email);
    user.friendRequests.push({ username: me.username, email: me.email });
    console.log(user.friendRequests);
    await user.save();
    return 'Friend request sent successfully';
  }
  async acceptFriendRequest(
    friendRequestDto: FriendRequestDto,
  ): Promise<string> {
    const user = new this.userModel(
      await this.getUserByEmail(friendRequestDto.email),
    );
    const me = new this.userModel(await this.me(friendRequestDto.me));
    user.friends.push({ username: me.username, email: me.email });
    me.friendRequests = user.friendRequests.filter(
      (user) => user.email !== friendRequestDto.email,
    );
    me.friends.push({ username: user.username, email: user.email });
    await user.save();
    await me.save();
    return 'Friend request accepted successfully';
  }

  async declineFriendRequest(
    friendRequestDto: FriendRequestDto,
  ): Promise<string> {
    const me = new this.userModel(await this.me(friendRequestDto.me));
    me.friendRequests = me.friendRequests.filter(
      (user) => user.email !== friendRequestDto.email,
    );
    await me.save();
    return 'Friend request declined successfully';
  }
}
