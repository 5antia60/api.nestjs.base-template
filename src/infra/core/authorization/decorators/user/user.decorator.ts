import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { UserSessionModel } from '../../../../../modules/user/models/user-session.model';

export const User = createParamDecorator(
  (data: unknown, context: ExecutionContext): UserSessionModel => {
    const request = context.switchToHttp().getRequest();

    return {
      id: request.user.sub,
      email: request.user.username,
      role: request.user.role,
    } as UserSessionModel;
  },
);
