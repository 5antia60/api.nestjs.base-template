//#region Imports

import { Body, ClassSerializerInterceptor, Controller, Get, Param, Post, Put, UseInterceptors } from '@nestjs/common';
import { UserService } from '../services/user.service';
import { ApiBearerAuth, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Crud, CrudRequest, ParsedRequest } from '@rewiko/crud';
import { UserEntity } from '../entities/user.entity';
import { UserSessionModel } from 'src/modules/auth/models/user-session.model';
import { UserProxy } from '../models/user.proxy';
import { User } from 'src/modules/auth/decorators/user.decorator';
import { CreateUserPayload } from '../models/create-user.payload';
import { UpdateUserPayload } from '../models/update-user.payload';

//#endregion

@ApiBearerAuth()
@Crud({
  model: {
    type: UserEntity,
  },
  query: {
    exclude: ['password'],
  },
  routes: {
    exclude: [
      'updateOneBase',
      'createManyBase',
      'deleteOneBase',
    ],
  },
})
@UseInterceptors(ClassSerializerInterceptor)
@ApiTags('users')
@Controller('users')
export class UserController {

  //#region Constructor

  constructor(
    private service: UserService,
  ) { }

  //#endregion

  //#region Methods

  @Get('me')
  @ApiOkResponse({ description: 'Get info about user logged.', type: UserProxy })
  @ApiOperation({ summary: 'Returns info about user logged.' })
  public async getMe(@User() requestUser: UserSessionModel): Promise<UserProxy> {
    return await this.service.getMe(requestUser).then(response => new UserProxy(response));;
  }

  @Get(':id')
  @ApiOkResponse({ description: 'Get info about one user.', type: UserProxy })
  @ApiOperation({ summary: 'Returns info about one user.' })
  public async getOne(
    @User() requestUser: UserSessionModel,
    @Param('id') entityId: number,
    @ParsedRequest() crudRequest: CrudRequest,
  ): Promise<UserProxy> {
    return await this.service.getOne(+entityId, crudRequest).then(response => new UserProxy(response));
  }

  @Post()
  @ApiOkResponse({ description: 'Create new user.', type: UserProxy })
  @ApiOperation({ summary: 'Create and returns info about new user.' })
  public async createOne(
    @Body() payload: CreateUserPayload,
  ): Promise<UserProxy> {
    return await this.service.createOne(payload).then(response => new UserProxy(response));
  }

  @Put(':id')
  @ApiOkResponse({ description: 'Create new user.', type: UserProxy })
  @ApiOperation({ summary: 'Create and returns info about new user.' })
  public async replaceOne(
    @User() requestUser: UserSessionModel,
    @Param('id') entityId: number,
    @Body() payload: UpdateUserPayload,
  ): Promise<UserProxy> {
    return await this.service.updateOne(requestUser, +entityId, payload).then(response => new UserProxy(response));
  }

  //#endregion

}
