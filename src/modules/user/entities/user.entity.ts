//#region Imports

import { Column, Entity } from 'typeorm';
import { BaseEntity } from '../../../common/crud/base-entity';

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

  @Column({ nullable: false, length: 256 })
  public email: string;

  @Column({ nullable: true, length: 512 })
  public imageUrl?: string;

  @Column({ nullable: false })
  public password: string;

  //#endregion

}
