//#region Imports

import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { UserEntity } from '../entities/user.entity';
import { BaseProxy } from '../../../common/crud/base.proxy';
import { GetManyDefaultResponseProxy } from '../../../common/proxies/get-many-default-response.proxy';
import { RolesEnum } from './roles.enum';

//#endregion

export class UserProxy extends BaseProxy<UserEntity> {

  constructor(entity: UserEntity) {
    super(entity);

    this.name = entity.name;
    this.role = entity.role;
    this.email = entity.email;
    this.imageUrl = entity.imageUrl;
  }

  //#region Public Properties

  @ApiProperty({ type: () => String })
  public name: string;

  @ApiProperty({ type: () => String, enum: RolesEnum })
  public role: RolesEnum;

  @ApiProperty({ type: () => String })
  public email: string;

  @ApiPropertyOptional({ type: () => String })
  public imageUrl?: string;

  //#endregion
}

export class GetManyDefaultResponseUserProxy extends GetManyDefaultResponseProxy {

  @ApiProperty({ type: () => UserProxy, isArray: true })
  data!: UserProxy[];

}
