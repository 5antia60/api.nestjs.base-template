//#region Imports

import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  Param,
  Post,
  Put, Query,
  UseInterceptors,
} from '@nestjs/common';
import { GetPaginationQuery } from '../../../common/payloads/get-pagination.query';
import { RolesEnum } from '../../user/models/roles.enum';
import { UserSessionModel } from '../../user/models/user-session.model';
import { CategoryService } from '../services/category.service';
import { ApiBearerAuth, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { GetManyDefaultResponseCategoryProxy, CategoryProxy } from '../models/category.proxy';
import { CreateCategoryPayload } from '../models/create-category.payload';
import { UpdateCategoryPayload } from '../models/update-category.payload';
import { User } from '../../../infra/core/authorization/decorators/user/user.decorator';
import { ProtectTo } from '../../../infra/core/authorization/decorators/protect/protect.decorator';

//#endregion

@ApiBearerAuth()
@UseInterceptors(ClassSerializerInterceptor)
@ApiTags('categories')
@Controller('categories')
export class CategoryController {

  //#region Constructor

  constructor(
    private service: CategoryService,
  ) { }

  //#endregion

  //#region Public Methods

  @Get()
  @ProtectTo(RolesEnum.DEFAULT)
  @ApiOkResponse({ description: 'Get info about many categories.', type: CategoryProxy })
  @ApiOperation({ summary: 'Returns info about many categories.' })
  public async listMany(
    @Query() getPaginationPayload: GetPaginationQuery,
  ): Promise<GetManyDefaultResponseCategoryProxy> {
    return await this.service.listMany(getPaginationPayload);
  }

  @Get(':id')
  @ProtectTo(RolesEnum.DEFAULT, RolesEnum.VETERINARIAN)
  @ApiOkResponse({ description: 'Get info about one category.', type: CategoryProxy })
  @ApiOperation({ summary: 'Returns info about one category.' })
  public async getOne(@Param('id') entityId: number): Promise<CategoryProxy> {
    return await this.service.getOne(+entityId).then(response => response.toProxy());
  }

  @Post()
  @ProtectTo(RolesEnum.DEFAULT, RolesEnum.VETERINARIAN)
  @ApiOkResponse({ description: 'Create new category.', type: CategoryProxy })
  @ApiOperation({ summary: 'Create and returns info about new category.' })
  public async createOne(
    @Body() payload: CreateCategoryPayload,
  ): Promise<CategoryProxy> {
    return await this.service.createOne(payload).then(response => new CategoryProxy(response));
  }

  @Put(':id')
  @ProtectTo(RolesEnum.DEFAULT, RolesEnum.VETERINARIAN)
  @ApiOkResponse({ description: 'Create new category.', type: CategoryProxy })
  @ApiOperation({ summary: 'Create and returns info about new category.' })
  public async replaceOne(
    @User() requestUser: UserSessionModel,
    @Param('id') entityId: number,
    @Body() payload: UpdateCategoryPayload,
  ): Promise<CategoryProxy> {
    return await this.service.updateOne(requestUser, +entityId, payload)
      .then(response => new CategoryProxy(response));
  }

  //#endregion

}
