//#region Imports

import { Column, Entity } from 'typeorm';
import { BaseEntity } from '../../../common/crud/base-entity';
import { RolesEnum } from 'src/modules/auth/models/roles.enum';
import { UserProxy } from '../models/user.proxy';

//#endregion

@Entity('users')
export class UserEntity extends BaseEntity<UserEntity> {

  //#region Constructor

  constructor(
    partial: Partial<UserEntity> | UserEntity,
  ) {
    super();

    Object.assign(this, { ...partial });
  }

  //#endregion

  //#region Columns

  @Column({ nullable: false, length: 128 })
  public name: string;

  @Column({ nullable: false, length: 128 })
  public role: RolesEnum;

  @Column({ nullable: false, length: 256 })
  public email: string;

  @Column({ nullable: true, length: 1024 })
  public imageUrl?: string;

  @Column({ nullable: false })
  public password: string;

  //#endregion

  //#region Public Methods

  public toProxy(): UserProxy {
    return new UserProxy(this);
  }

  //#endregion

}
