import { Type } from '@nestjs/common';
import { CategoryEntity } from '../../../modules/category/entities/category.entity';
import { UserEntity } from '../../../modules/user/entities/user.entity';

export const TypeormEntities: Type[] = [
  UserEntity,
  CategoryEntity,
];
