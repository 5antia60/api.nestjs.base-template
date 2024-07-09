//#region Imports

import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { LoginPayload } from '../models/login.payload';
import { TokenProxy } from '../models/token.proxy';
import { AuthService } from '../services/auth.service';
import { ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiUnauthorizedResponse } from '@nestjs/swagger';

//#endregion

@Controller('auth')
export class AuthController {

  //#region Constructor

  constructor(
    private readonly authService: AuthService,
  ) {}

  //#endregion

  //#region Public Methods

  @Post('login')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Returns the auth token of user by e-mail and password.' })
  @ApiOkResponse({ description: 'O usuário foi logado com sucesso', type: TokenProxy })
  @ApiUnauthorizedResponse({ description: 'A senha digitada está incorreta.' })
  @ApiNotFoundResponse({ description: 'Não foi encontrado um usuário com esse e-mail.' })
  public async signIn(@Body() payload: LoginPayload): Promise<TokenProxy> {
    return await this.authService.signIn(payload);
  }

  //#endregion

}
