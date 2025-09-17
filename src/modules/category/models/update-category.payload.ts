import { ApiPropertyOptional } from '@nestjs/swagger';
import { BaseCrudCreatePayload } from '../../../common/payloads/base-crud-create.payload';
import { IsOptional, IsString, MaxLength } from 'class-validator';
import { DefaultValidationMessages } from '../../../common/messages/default-validation-messages';

export class UpdateCategoryPayload extends BaseCrudCreatePayload {

  @ApiPropertyOptional()
  @IsOptional()
  @IsString({ message: DefaultValidationMessages.IsString('title') })
  @MaxLength(128, { message: DefaultValidationMessages.MaxLength('title', 128) })
  public title?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString({ message: DefaultValidationMessages.IsString('description') })
  @MaxLength(512, { message: DefaultValidationMessages.MaxLength('description', 512) })
  public description?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString({ message: DefaultValidationMessages.IsString('imageUrl') })
  @MaxLength(2048, { message: DefaultValidationMessages.MaxLength('imageUrl', 2048) })
  public imageUrl?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString({ message: DefaultValidationMessages.IsString('tags'), each: true })
  @MaxLength(2048, { message: DefaultValidationMessages.MaxLength('tags', 2048), each: true })
  public tags?: string[];

}
