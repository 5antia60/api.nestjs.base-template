//#region Imports

import { Column, Entity } from 'typeorm';
import { BaseEntity } from '../../../common/crud/base-entity';
import { CategoryProxy } from '../models/category.proxy';

//#endregion

@Entity('categories')
export class CategoryEntity extends BaseEntity<CategoryEntity> {

  //#region Constructor

  constructor(
    partial: Partial<CategoryEntity> | CategoryEntity,
  ) {
    super();

    Object.assign(this, { ...partial });
  }

  //#endregion

  //#region Columns

  @Column({ nullable: false, length: 128 })
  public title!: string;

  @Column({ nullable: true, length: 512 })
  public description?: string;

  @Column({ nullable: true, length: 2048 })
  public imageUrl?: string;

  @Column({ type: 'simple-json', nullable: true })
  public tags?: string[];

  //#endregion

  //#region Public Methods

  public toProxy(): CategoryProxy {
    return new CategoryProxy(this);
  }

  //#endregion

}
