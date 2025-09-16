//#region Imports

import { ApiProperty } from '@nestjs/swagger';
import { IsDefined, IsEmail, IsString, MinLength } from 'class-validator';
import { DefaultValidationMessages } from '../../../common/messages/default-validation-messages';

//#endregion

export class LoginPayload {

  @ApiProperty({ type: () => String })
  @IsDefined({ message: 'É necessário enviar o e-mail do usuário.' })
  @IsString({ message: DefaultValidationMessages.IsString('E-mail') })
  @IsEmail({}, { message: DefaultValidationMessages.IsEmail('E-mail') })
  public email!: string;

  @ApiProperty({ type: () => String })
  @IsDefined({ message: 'É necessário enviar a senha do usuário.' })
  @IsString({ message: DefaultValidationMessages.IsString('Senha') })
  @MinLength(6, { message: 'A senha precisa ter no mínimo 6 caracteres.' })
  public password!: string;

}
