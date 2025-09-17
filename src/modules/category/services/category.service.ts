//#region Imports

import { Injectable, NotFoundException } from '@nestjs/common';
import { GetPaginationQuery } from '../../../common/payloads/get-pagination.query';
import { getTypeormPaginationProps } from '../../../common/utils/get-typeorm-pagination.props';
import { UserSessionModel } from '../../user/models/user-session.model';
import { CategoryEntity } from '../entities/category.entity';
import { CreateCategoryPayload } from '../models/create-category.payload';
import { UpdateCategoryPayload } from '../models/update-category.payload';
import { isNullOrUndefined } from 'src/utils/functions';
import { GetManyDefaultResponseCategoryProxy } from '../models/category.proxy';
import { CategoryRepository } from '../repositories/category.repository';

//#endregion

@Injectable()
export class CategoryService {

  //#region Constructor

  constructor(
    private readonly repository: CategoryRepository,
  ) {}

  //#endregion

  //#region Public Methods

  public async listMany(paginationArgs?: GetPaginationQuery): Promise<GetManyDefaultResponseCategoryProxy> {
    const pagination = {
      page: paginationArgs?.page || 0,
      itemsPerPage: paginationArgs?.itemsPerPage || 5,
    };

    const paginationProps = getTypeormPaginationProps(pagination);
    const [result, total] = await this.repository.findAndCount({
      ...paginationProps,
    });

    return new GetManyDefaultResponseCategoryProxy({
      data: result.map(entity => entity.toProxy()),
      pageCount: Math.ceil(total / pagination.itemsPerPage),
      itemsPerPage: pagination.itemsPerPage,
      page: pagination.page,
      total,
    });
  }

  public async getOne(entityId: number): Promise<CategoryEntity> {
    const entity = await this.repository.findOneBy({
      id: entityId,
    });

    if (!entity)
      throw new NotFoundException('A categoria não foi encontrada.');

    return entity;
  }

  public async createOne(payload: CreateCategoryPayload): Promise<CategoryEntity> {
    const newEntity = new CategoryEntity(
      await this.getEntityFromPayload(payload)
    );

    return await this.repository.save(newEntity);
  }

  public async updateOne(
    requestUser: UserSessionModel,
    entityId: number,
    payload: UpdateCategoryPayload,
  ): Promise<CategoryEntity> {
    const entity = await this.repository.findOneBy({ id: entityId });

    if (!entity)
      throw new NotFoundException('Categoria não encontrada.');

    const entityToUpdate = new CategoryEntity({
      ...entity,
      ...await this.getEntityFromPayload(payload),
    });

    return await this.repository.save(entityToUpdate);
  }

  //#endregion

  //#region Private Methods

  private async getEntityFromPayload(
    payload: CreateCategoryPayload | UpdateCategoryPayload,
    id?: number,
  ): Promise<CategoryEntity> {
    return new CategoryEntity({
      ...!isNullOrUndefined(id) && { id },
      ...!isNullOrUndefined(payload.title) && { title: payload.title },
      ...!isNullOrUndefined(payload.description) && { description: payload.description },
      ...!isNullOrUndefined(payload.imageUrl) && { imageUrl: payload.imageUrl },
      ...!isNullOrUndefined(payload.tags) && { tags: payload.tags },
    });
  }

  //#endregion

}
