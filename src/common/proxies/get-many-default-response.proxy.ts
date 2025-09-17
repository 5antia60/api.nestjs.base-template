//#region Imports

import { ApiProperty } from '@nestjs/swagger';

//#endregion

export class GetManyDefaultResponseProxy {

  constructor(
    data: GetManyDefaultResponseProxy,
  ) {
    this.itemsPerPage = data.itemsPerPage;
    this.total = data.total;
    this.page = data.page;
    this.pageCount = data.pageCount;
  }

  @ApiProperty({ type: () => Number })
  public itemsPerPage!: number;

  @ApiProperty({ type: () => Number })
  public total!: number;

  @ApiProperty({ type: () => Number })
  public page!: number;

  @ApiProperty({ type: () => Number })
  public pageCount!: number;

}
