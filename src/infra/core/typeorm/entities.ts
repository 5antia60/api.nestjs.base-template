import { Type } from '@nestjs/common';
import { UserEntity } from '../../../modules/user/entities/user.entity';

export const TypeormEntities: Type[] = [
  UserEntity,
];
