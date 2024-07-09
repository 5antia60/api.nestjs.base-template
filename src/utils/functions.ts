/**
 * Project default functions
 */
import { UserEntity } from '../modules/user/entities/user.entity';
import { RolesEnum } from '../modules/user/models/roles.enum';
import { UserSessionModel } from '../modules/user/models/user-session.model';

export function isNullOrUndefined(value: any): boolean {
    return value === null || value === undefined;
}

export function isDefaultUser(user?: UserEntity | UserSessionModel): boolean {
    return !!user && user.role === RolesEnum.DEFAULT;
}

export function isVeterinarianUser(user?: UserEntity | UserSessionModel): boolean {
    return !!user && user.role === RolesEnum.VETERINARIAN;
}
