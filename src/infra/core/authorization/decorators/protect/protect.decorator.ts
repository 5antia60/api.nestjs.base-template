import { UseGuards, applyDecorators } from '@nestjs/common';
import { ApiBearerAuth, ApiForbiddenResponse } from '@nestjs/swagger';
import { Roles } from '../roles/roles.decorator';
import { RolesGuard } from '../../roles/roles.guard';

export function ProtectTo(...roles: string[]): MethodDecorator {
  return applyDecorators(
    Roles(...roles),
    UseGuards(RolesGuard),
    ApiBearerAuth(),
    ApiForbiddenResponse({ description: 'Você não tem permissão para isso. ' }),
  );
}
