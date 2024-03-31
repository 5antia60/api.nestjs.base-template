//#region Imports

import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsBoolean, IsOptional } from 'class-validator';
import { DefaultValidationMessages } from '../messages/default-validation-messages';

//#endregion

/**
 * Propriedades básicas para um de um payload de atualização
 */
export class BaseCrudUpdatePayload {

  @ApiPropertyOptional()
  @IsOptional()
  @IsBoolean({ message: DefaultValidationMessages.IsBoolean('isActive') })
  public isActive?: boolean;

}
