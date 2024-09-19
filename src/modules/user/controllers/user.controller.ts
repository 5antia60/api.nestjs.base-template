//#region Imports

import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  Param,
  Post,
  Put,
  UseInterceptors
} from '@nestjs/common';
import { UserService } from '../services/user.service';
import { ApiBearerAuth, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { CrudRequest, ParsedRequest } from '@rewiko/crud';
import { UserProxy } from '../models/user.proxy';
import { CreateUserPayload } from '../models/create-user.payload';
import { UpdateUserPayload } from '../models/update-user.payload';
import { UserSessionModel } from '../models/user-session.model';
import { User } from '../../../infra/core/authorization/decorators/user/user.decorator';
import { ProtectTo } from '../../../infra/core/authorization/decorators/protect/protect.decorator';
import { RolesEnum } from '../models/roles.enum';

//#endregion

@ApiBearerAuth()
@UseInterceptors(ClassSerializerInterceptor)
@ApiTags('users')
@Controller('users')
export class UserController {

  //#region Constructor

  constructor(
    private service: UserService,
  ) { }

  //#endregion

  //#region Public Methods

  @Get('me')
  @ProtectTo(RolesEnum.DEFAULT, RolesEnum.VETERINARIAN)
  @ApiOkResponse({ description: 'Get info about user logged.', type: UserProxy })
  @ApiOperation({ summary: 'Returns info about user logged.' })
  public async getMe(@User() requestUser: UserSessionModel): Promise<UserProxy> {
    return await this.service.getMe(requestUser).then(response => new UserProxy(response));
  }

  @Get()
  @ProtectTo(RolesEnum.DEFAULT)
  @ApiOkResponse({ description: 'Get info about many users.', type: UserProxy })
  @ApiOperation({ summary: 'Returns info about many users.' })
  public async listMany(
    @ParsedRequest() crudRequest: CrudRequest,
  ): Promise<UserProxy[]> {
    return await this.service.listMany(crudRequest)
      .then(response => response.map(entity => entity.toProxy()));
  }

  @Get(':id')
  @ProtectTo(RolesEnum.DEFAULT, RolesEnum.VETERINARIAN)
  @ApiOkResponse({ description: 'Get info about one user.', type: UserProxy })
  @ApiOperation({ summary: 'Returns info about one user.' })
  public async getOne(
    @User() requestUser: UserSessionModel,
    @Param('id') entityId: number,
    @ParsedRequest() crudRequest: CrudRequest,
  ): Promise<UserProxy> {
    return await this.service.getOne(+entityId, crudRequest).then(response => response.toProxy());
  }

  @Post()
  @ProtectTo(RolesEnum.DEFAULT, RolesEnum.VETERINARIAN)
  @ApiOkResponse({ description: 'Create new user.', type: UserProxy })
  @ApiOperation({ summary: 'Create and returns info about new user.' })
  public async createOne(
    @Body() payload: CreateUserPayload,
  ): Promise<UserProxy> {
    return await this.service.createOne(payload).then(response => new UserProxy(response));
  }

  @Put(':id')
  @ProtectTo(RolesEnum.DEFAULT, RolesEnum.VETERINARIAN)
  @ApiOkResponse({ description: 'Create new user.', type: UserProxy })
  @ApiOperation({ summary: 'Create and returns info about new user.' })
  public async replaceOne(
    @User() requestUser: UserSessionModel,
    @Param('id') entityId: number,
    @Body() payload: UpdateUserPayload,
  ): Promise<UserProxy> {
    return await this.service.updateOne(requestUser, +entityId, payload)
      .then(response => new UserProxy(response));
  }

  //#endregion

}
