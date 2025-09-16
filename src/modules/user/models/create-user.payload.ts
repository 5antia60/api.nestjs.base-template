import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { BaseCrudUpdatePayload } from '../../../common/payloads/base-crud-update.payload';
import { IsDefined, IsEnum, IsOptional, IsString, MaxLength, MinLength } from 'class-validator';
import { DefaultValidationMessages } from '../../../common/messages/default-validation-messages';
import { RolesEnum } from './roles.enum';

export class CreateUserPayload extends BaseCrudUpdatePayload {

  @ApiProperty({ type: () => String })
  @IsDefined({ message: 'É necessário enviar o nome.' })
  @IsString({ message: DefaultValidationMessages.IsString('name') })
  @MaxLength(128, { message: DefaultValidationMessages.MaxLength('nome', 128) })
  public name!: string;

  @ApiProperty({ type: () => String, enum: RolesEnum })
  @IsDefined({ message: 'É necessário enviar o cargo.' })
  @IsEnum(RolesEnum, { message: DefaultValidationMessages.IsEnum('role', 'RolesEnum') })
  public role!: RolesEnum;

  @ApiProperty({ type: () => String })
  @IsDefined({ message: 'É necessário enviar o email.' })
  @IsString({ message: DefaultValidationMessages.IsString('email') })
  @MaxLength(256, { message: DefaultValidationMessages.MaxLength('email', 256) })
  public email!: string;

  @ApiPropertyOptional({ type: () => String })
  @IsOptional()
  @IsString({ message: DefaultValidationMessages.IsString('imageUrl') })
  @MaxLength(1024, { message: DefaultValidationMessages.MaxLength('imagem', 1024) })
  public imageUrl?: string;

  @ApiProperty({ type: () => String })
  @IsDefined({ message: 'É necessário enviar a senha.' })
  @IsString({ message: DefaultValidationMessages.IsString('password') })
  @MaxLength(64, { message: DefaultValidationMessages.MaxLength('senha', 64) })
  @MinLength(8, { message: DefaultValidationMessages.MinLength('senha', 8) })
  public password!: string;

}
