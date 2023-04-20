import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { jwtConstants } from './constants';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async login(email: string, pass: string) {
    const user = await this.usersService.getUserByEmail(email);
    if (!user) throw new Error('User not found');
    if (user.password !== pass) {
      throw new UnauthorizedException();
    }
    const payload = { email: user.email, sub: user.username };

    return {
      access_token: await this.jwtService.signAsync(payload, {
        expiresIn: '5m',
        secret: jwtConstants.secret,
      }),
    };
  }
}
