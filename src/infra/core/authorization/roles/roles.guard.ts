//#region Imports

import { CanActivate, ExecutionContext, ForbiddenException, Injectable, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

//#endregion

@Injectable()
export class RolesGuard implements CanActivate {

  //#region Constructor

  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {
    this.jwtSecret = this.configService.get<string>('JWT_SECRET_KEY');
  }

  //#endregion

  //#region Private Properties

  private readonly jwtSecret?: string;

  //#endregion

  //#region Public Methods

  public async canActivate(context: ExecutionContext): Promise<boolean> {
    let roles = new Reflector().get<string[]>('roles', context.getHandler());

    if (!roles || roles.length === 0)
      return true;

    const request = context.switchToHttp().getRequest<Request>();
    const token = this.getTokenByRequest(request);

    if (!token)
      throw new UnauthorizedException('Você não tem permissão para acessar esse recurso.');

    try {
      request['user'] = await this.jwtService.verifyAsync(token, {
        secret: this.jwtSecret,
      });
    } catch (err) {
      throw new UnauthorizedException('Você não tem permissão para acessar esses recursos.');
    }

    if (request['user'] && request['user']['role'] && roles.includes(request['user']['role']))
      return true;

    throw new ForbiddenException('Você não tem permissão para acessar esses recursos.');
  }

  //#endregion

  //#region Private Methods

  private getTokenByRequest(request: Request): string | undefined {
    if (!request.headers['authorization'])
      throw new UnauthorizedException('Você não tem permissão para acessar esse recurso.');

    const [type, token] = request.headers['authorization'].split(' ') ?? [];

    return type === 'Bearer' ? token : undefined;
  }

  //#endregion

}
