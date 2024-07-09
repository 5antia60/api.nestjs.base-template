//#region Imports

import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '../entities/user.entity';
import { Repository } from 'typeorm';
import { createFindWhereFilter, CrudRequestTyped } from 'src/infra/libs/nestjsx-crud/@types/nestjsx-crud';
import { CreateUserPayload } from '../models/create-user.payload';
import { UpdateUserPayload } from '../models/update-user.payload';
import { isNullOrUndefined } from 'src/utils/functions';
import { UserSessionModel } from '../models/user-session.model';
import * as bcryptjs from 'bcryptjs';

//#endregion

@Injectable()
export class UserService {

  //#region Constructor

  constructor(
    @InjectRepository(UserEntity)
    private readonly repository: Repository<UserEntity>,
  ) {}

  //#endregion

  //#region Public Methods

  public async getMe(requestUser: UserSessionModel): Promise<UserEntity> {
    const user = await this.repository.findOneBy({ id: requestUser.id });

    if (!user)
      throw new NotFoundException('O usuário não foi encontrado.');

    return user;
  }

  public async getOne(entityId: number, crudRequest?: CrudRequestTyped<UserEntity>): Promise<UserEntity> {
    const entity = await this.repository.findOneBy({
      ...crudRequest && createFindWhereFilter<UserEntity>(crudRequest),
      id: entityId,
    });

    if (!entity)
      throw new NotFoundException(`O usuário não foi encontrado.`);
    
    return entity;
  }

  public async createOne(payload: CreateUserPayload): Promise<UserEntity> {
    const newUser = new UserEntity({
      ...await this.getEntityFromPayload(payload),
      password: await this.encryptPassword(payload.password),
    });

    return await this.repository.save(newUser);
  }

  public async updateOne(
    requestUser: UserSessionModel,
    entityId: number,
    payload: UpdateUserPayload,
  ): Promise<UserEntity> {
    if (entityId !== requestUser.id)
      throw new BadRequestException('Não é possível alterar outro usuário.');

    const entity = await this.repository.findOneBy({ id: entityId });

    if (!entity)
      throw new NotFoundException('Usuário não encontrado.');

    const userToUpdate = new UserEntity({
      ...entity,
      ...await this.getEntityFromPayload(payload),
    });

    return await this.repository.save(userToUpdate);
  }

  public getRepository(): Repository<UserEntity> {
    return this.repository;
  }

  //#endregion

  //#region Private Methods

  private async getEntityFromPayload(
    payload: CreateUserPayload | UpdateUserPayload,
    id?: number,
  ): Promise<UserEntity> {
    return new UserEntity({
      ...!isNullOrUndefined(id) && { id },
      ...!isNullOrUndefined(payload.name) && { name: payload.name },
      ...!isNullOrUndefined(payload.role) && { role: payload.role },
      ...!isNullOrUndefined(payload.email) && { email: payload.email },
      ...!isNullOrUndefined(payload.imageUrl) && { imageUrl: payload.imageUrl },
    });
  }

  private async encryptPassword(plainPassword: string): Promise<string> {
    const salt = await bcryptjs.genSalt();
  
    return await bcryptjs.hash(plainPassword, salt);
  }

  //#endregion

}
