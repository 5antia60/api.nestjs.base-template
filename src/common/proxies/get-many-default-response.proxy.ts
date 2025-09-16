//#region Imports

import { ApiProperty } from '@nestjs/swagger';

//#endregion

export class GetManyDefaultResponseProxy {

  @ApiProperty({ type: () => Number })
  public itemsPerPage!: number;

  @ApiProperty({ type: () => Number })
  public total!: number;

  @ApiProperty({ type: () => Number })
  public page!: number;

  @ApiProperty({ type: () => Number })
  public pageCount!: number;

}
