//#region Imports

import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { CategoryEntity } from '../entities/category.entity';
import { BaseProxy } from '../../../common/crud/base.proxy';
import { GetManyDefaultResponseProxy } from '../../../common/proxies/get-many-default-response.proxy';

//#endregion

export class CategoryProxy extends BaseProxy<CategoryEntity> {

  constructor(
    entity: CategoryEntity,
  ) {
    super(entity);

    this.title = entity.title;
    this.description = entity.description;
    this.imageUrl = entity.imageUrl;
    this.tags = entity.tags;
  }

  //#region Public Properties

  @ApiProperty()
  public title!: string;

  @ApiPropertyOptional()
  public description?: string;

  @ApiPropertyOptional()
  public imageUrl?: string;

  @ApiPropertyOptional()
  public tags?: string[];

  //#endregion
}

export class GetManyDefaultResponseCategoryProxy extends GetManyDefaultResponseProxy {

  constructor(
    data: GetManyDefaultResponseCategoryProxy,
  ) {
    super(data);
    this.data = data.data;
  }

  @ApiProperty({ type: () => CategoryProxy, isArray: true })
  data!: CategoryProxy[];

}
