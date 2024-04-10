//#region Imports

import { RolesEnum } from './roles.enum';
import { IJwtPayload } from './jwt.payload';
import { NotFoundException, UnauthorizedException } from '@nestjs/common';
import { UserEntity } from 'src/modules/user/entities/user.entity';
import { UserService } from 'src/modules/user/services/user.service';

//#endregion

export class UserSessionModel {

  //#region Constructor
  
  constructor(
    iJwtPayload: IJwtPayload,
    private readonly userService?: UserService,
  ) {
    this.id = iJwtPayload.id;
    this.name = iJwtPayload.name;
    this.role = iJwtPayload.role;
  }

  //#endregion

  //#region Properties

  public id: number;

  public name: string;

  public role: RolesEnum;

  //#endregion

  //#region Methods
  
  public async getUser(): Promise<UserEntity> {
    if (!this.userService || !this.id)
      throw new NotFoundException('O usuário não existe');

    return this.userService.getRepository().findOneBy({ id: this.id }).catch(() => {
      throw new UnauthorizedException('Você não tem mais permissão para realizar essa ação, seu usuário foi desativado ou removido.');
    });
  }

  //#endregion
  
}
