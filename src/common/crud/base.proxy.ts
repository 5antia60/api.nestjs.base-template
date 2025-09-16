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

  @ApiProperty({ type: () => Number })
  public id!: number;

  @ApiProperty({ type: () => Date })
  public createdAt?: Date;

  @ApiProperty({ type: () => Date })
  public updatedAt?: Date;

  @ApiProperty({ type: () => Boolean, default: true })
  public isActive?: boolean;

  //#endregion

}
