import { ApiProperty } from '@nestjs/swagger';
import { BaseCrudUpdatePayload } from '../../../common/payloads/base-crud-update.payload';
import { IsDefined, IsOptional, IsString, MaxLength } from 'class-validator';
import { DefaultValidationMessages } from '../../../common/messages/default-validation-messages';

export class CreateUserPayload extends BaseCrudUpdatePayload {

  @ApiProperty()
  @IsDefined({ message: 'É necessrio enviar o nome.' })
  @IsString({ message: DefaultValidationMessages.IsString('name') })
  @MaxLength(128, { message: DefaultValidationMessages.MaxLength('name', 128) })
  public name: string;

  @ApiProperty()
  @IsDefined({ message: 'É necessário enviar o email.' })
  @IsString({ message: DefaultValidationMessages.IsString('email') })
  @MaxLength(256, { message: DefaultValidationMessages.MaxLength('email', 256) })
  public email: string;

  @ApiProperty()
  @IsOptional()
  @IsString({ message: DefaultValidationMessages.IsString('email') })
  @MaxLength(512, { message: DefaultValidationMessages.MaxLength('email', 512) })
  public imageUrl: string;

  @ApiProperty()
  public password: string;

  @ApiProperty()
  public celular: string;

  @ApiProperty()
  public cep: string;

  @ApiProperty()
  public endereco: string;

  @ApiProperty()
  public numero: string;

  @ApiProperty()
  public complemento: string;

  @ApiProperty()
  public bairro: string;

  @ApiProperty()
  public cidade: string;

  @ApiProperty()
  public uf: string;

  @ApiProperty()
  public empresa: string;

  @ApiProperty()
  public cnpj: string;
}
