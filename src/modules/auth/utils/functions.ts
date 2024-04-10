//#region Imports

import { UserEntity } from 'src/modules/user/entities/user.entity';
import { RolesEnum } from '../models/roles.enum';
import { UserSessionModel } from '../models/user-session.model';

//#endregion

export function isDefaultUser(user?: UserEntity | UserSessionModel): boolean {
  return !!user && user.role === RolesEnum.DEFAULT;
}

export function isVeterinarianUser(user?: UserEntity | UserSessionModel): boolean {
  return !!user && user.role === RolesEnum.VETERINARIAN;
}
