import { Type } from '@nestjs/common';
import { AddUserEntity1713395271507 } from '../../database/migrations/1713395271507-AddUserEntity';
import { AddCategoryEntity1758126283678 } from '../../database/migrations/1758126283678-AddCategoryEntity';

export const TypeormMigrations: Type[] = [
  AddUserEntity1713395271507,
  AddCategoryEntity1758126283678,
];
