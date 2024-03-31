//#region Imports

import { Controller } from '@nestjs/common';
import { UserService } from '../services/user.service';
import { ApiTags } from '@nestjs/swagger';

//#endregion

@Controller('users')
@ApiTags('users')
export class UserController {

  //#region Constructor

  constructor(
    private userService: UserService,
  ) { }

  //#endregion

  //#region Methods

  //#endregion

}
