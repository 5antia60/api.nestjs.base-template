//#region Imports

import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { compareSync } from 'bcrypt';
import { UserService } from '../../user/services/user.service';
import { LoginPayload } from '../models/login.payload';
import { TokenProxy } from '../models/token.proxy';

//#endregion

@Injectable()
export class AuthService {

  //#region Constructor

  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {
    this.jwtExpirationTime = this.configService.get<string>('JWT_EXPIRES_IN');
  }

  //#endregion

  //#region Private Properties

  private jwtExpirationTime?: string;

  //#endregion

  //#region Public Methods

  public async signIn(payload: LoginPayload): Promise<TokenProxy> {
    const user = await this.userService.getRepository().findOneBy({ email: payload.email });

    if (!user || !compareSync(payload.password, user.password))
      throw new UnauthorizedException('signIn error');

    const token = this.jwtService.sign({
      sub: user.id,
      username: user.email,
      role: user.role,
    });

    return new TokenProxy({
      expiresIn: this.jwtExpirationTime || '1d',
      token,
    })
  }

  //#endregion

}
