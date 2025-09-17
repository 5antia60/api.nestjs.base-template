//#region Imports

import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { CategoryEntity } from '../entities/category.entity';

//#endregion

@Injectable()
export class CategoryRepository extends Repository<CategoryEntity> {

  //#region Constructor

  constructor(
    private readonly dataSource: DataSource,
  ) {
    super(CategoryEntity, dataSource.createEntityManager());
  }

  //#endregion

}