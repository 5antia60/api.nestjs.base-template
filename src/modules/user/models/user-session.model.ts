import { RolesEnum } from './roles.enum';

export interface UserSessionModel {
  id: number;
  email: string;
  role: RolesEnum;
}
