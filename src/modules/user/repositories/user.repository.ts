//#region Imports

import { DataSource, Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { UserEntity } from '../entities/user.entity';

//#endregion

@Injectable()
export class UserRepository extends Repository<UserEntity> {

  //#region Constructor

  constructor(
    private readonly dataSource: DataSource,
  ) {
    super(UserEntity, dataSource.createEntityManager());
  }

  //#endregion

}