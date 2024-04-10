//#region Imports

import { ApiProperty } from '@nestjs/swagger';
import { BaseEntity } from './base-entity';

//#endregion

export class BaseProxy<T extends BaseEntity<T>> {

  //#region Constructor

  constructor(base: T) {
    this.id = base.id;
    this.createdAt = base.createdAt;
    this.updatedAt = base.updatedAt;
    this.isActive = base.isActive;
  }

  //#endregion

  //#region Public Properties

  @ApiProperty()
  public id!: number;

  @ApiProperty()
  public createdAt?: Date;

  @ApiProperty()
  public updatedAt?: Date;

  @ApiProperty({ default: true })
  public isActive?: boolean;

  //#endregion

}
