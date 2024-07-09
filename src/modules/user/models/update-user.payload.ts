import { ApiPropertyOptional } from '@nestjs/swagger';
import { BaseCrudCreatePayload } from '../../../common/payloads/base-crud-create.payload';
import { IsEnum, IsOptional, IsString, MaxLength, MinLength } from 'class-validator';
import { DefaultValidationMessages } from '../../../common/messages/default-validation-messages';
import { RolesEnum } from './roles.enum';

export class UpdateUserPayload extends BaseCrudCreatePayload {

  @ApiPropertyOptional()
  @IsOptional()
  @IsString({ message: DefaultValidationMessages.IsString('name') })
  @MaxLength(128, { message: DefaultValidationMessages.MaxLength('nome', 128) })
  public name?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsEnum(RolesEnum, { message: DefaultValidationMessages.IsEnum('role', 'RolesEnum') })
  public role?: RolesEnum;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString({ message: DefaultValidationMessages.IsString('email') })
  @MaxLength(256, { message: DefaultValidationMessages.MaxLength('email', 256) })
  public email?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString({ message: DefaultValidationMessages.IsString('imageUrl') })
  @MaxLength(1024, { message: DefaultValidationMessages.MaxLength('imagem', 1024) })
  public imageUrl?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString({ message: DefaultValidationMessages.IsString('password') })
  @MaxLength(64, { message: DefaultValidationMessages.MaxLength('senha', 64) })
  @MinLength(8, { message: DefaultValidationMessages.MinLength('senha', 8) })
  public password?: string;

}
