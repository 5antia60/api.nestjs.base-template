//#region Imports

import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsBoolean, IsOptional } from 'class-validator';
import { DefaultValidationMessages } from '../messages/default-validation-messages';

//#endregion

/**
 * Propriedades básicas para um de um payload de criação
 */
export class BaseCrudCreatePayload {

  /**
   * Diz se deve ativar a entidade assim que criar
   */
  @ApiPropertyOptional()
  @IsOptional()
  @IsBoolean({ message: DefaultValidationMessages.IsBoolean('isActive') })
  public isActive?: boolean;

}
