export class TokenProxy {

  //#region Constructor

  constructor(
    props: TokenProxy,
  ) {
    this.token = `Bearer ${ props.token }`;
    this.expiresIn = props.expiresIn;
  }

  //#endregion

  public token: string;

  public expiresIn: string;

}
