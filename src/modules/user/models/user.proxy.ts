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

  @ApiProperty()
  public name: string;

  @ApiProperty()
  public role: RolesEnum;

  @ApiProperty()
  public email: string;

  @ApiPropertyOptional()
  public imageUrl?: string;

  //#endregion
}

export class GetManyDefaultResponseUserProxy extends GetManyDefaultResponseProxy {

  @ApiProperty({ type: () => UserProxy, isArray: true })
  data!: UserProxy[];

}
