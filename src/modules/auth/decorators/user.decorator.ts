//#region Imports

import { ExecutionContext, createParamDecorator } from '@nestjs/common';

//#endregion

export const User = createParamDecorator((data: unknown, ctx: ExecutionContext) => {
  const request = ctx.switchToHttp().getRequest();

  return request.user;
});
