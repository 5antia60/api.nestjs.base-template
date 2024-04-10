//#region Imports

import { ApiProperty } from '@nestjs/swagger';

//#endregion

export class GetManyDefaultResponseProxy {

  @ApiProperty()
  public count!: number;

  @ApiProperty()
  public total!: number;

  @ApiProperty()
  public page!: number;

  @ApiProperty()
  public pageCount!: number;

}
