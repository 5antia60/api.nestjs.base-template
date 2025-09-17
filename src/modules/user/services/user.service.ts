//#region Imports

import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { GetPaginationQuery } from '../../../common/payloads/get-pagination.query';
import { getTypeormPaginationProps } from '../../../common/utils/get-typeorm-pagination.props';
import { UserEntity } from '../entities/user.entity';
import { Repository } from 'typeorm';
import { CreateUserPayload } from '../models/create-user.payload';
import { UpdateUserPayload } from '../models/update-user.payload';
import { isNullOrUndefined } from 'src/utils/functions';
import { UserSessionModel } from '../models/user-session.model';
import { GetManyDefaultResponseUserProxy } from '../models/user.proxy';
import { UserRepository } from '../repositories/user.repository';
import * as bcryptjs from 'bcryptjs';

//#endregion

@Injectable()
export class UserService {

  //#region Constructor

  constructor(
    private readonly repository: UserRepository,
  ) {}

  //#endregion

  //#region Public Methods

  public async getMe(requestUser: UserSessionModel): Promise<UserEntity> {
    const user = await this.repository.findOneBy({ id: requestUser.id });

    if (!user)
      throw new NotFoundException('O usuário não foi encontrado.');

    return user;
  }

  public async listMany(paginationArgs?: GetPaginationQuery): Promise<GetManyDefaultResponseUserProxy> {
    const pagination = {
      page: paginationArgs?.page || 0,
      itemsPerPage: paginationArgs?.itemsPerPage || 5,
    };

    const paginationProps = getTypeormPaginationProps(pagination);
    const [result, total] = await this.repository.findAndCount({
      ...paginationProps,
    });

    return new GetManyDefaultResponseUserProxy({
      data: result.map(entity => entity.toProxy()),
      pageCount: Math.ceil(total / pagination.itemsPerPage),
      itemsPerPage: pagination.itemsPerPage,
      page: pagination.page,
      total,
    });
  }

  public async getOne(entityId: number): Promise<UserEntity> {
    const entity = await this.repository.findOneBy({
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
