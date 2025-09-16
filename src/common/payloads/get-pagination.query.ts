import { IsNumber, IsOptional, Min } from 'class-validator';
import { Type } from 'class-transformer';
import { DefaultValidationMessages } from '../messages/default-validation-messages';

export class GetPaginationQuery {
  @IsOptional()
  @Type(() => Number)
  @IsNumber({}, { message: DefaultValidationMessages.IsNumber('page') })
  @Min(0, { message: DefaultValidationMessages.MinLength('page', 0) })
  public page?: number;

  @IsOptional()
  @Type(() => Number)
  @IsNumber({}, { message: DefaultValidationMessages.IsNumber('itemsPerPage') })
  @Min(1, { message: DefaultValidationMessages.MinLength('itemsPerPage', 1) })
  public itemsPerPage?: number;
}
