//#region Imports

import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsBoolean, IsOptional } from 'class-validator';
import { DefaultValidationMessages } from '../messages/default-validation-messages';

//#endregion

export class BaseCrudUpdatePayload {

  @ApiPropertyOptional({ type: () => Boolean })
  @IsOptional()
  @IsBoolean({ message: DefaultValidationMessages.IsBoolean('isActive') })
  public isActive?: boolean;

}
