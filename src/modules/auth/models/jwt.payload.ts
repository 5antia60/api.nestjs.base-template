import { RolesEnum } from './roles.enum';

export interface IJwtPayload {

  id: number;
  name: string;
  role: RolesEnum;
}
