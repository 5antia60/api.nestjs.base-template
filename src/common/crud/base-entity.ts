import { Column, CreateDateColumn, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

export class BaseEntity<TExtra> {

  //#region Columns

  @PrimaryGeneratedColumn()
  public id!: number;

  @Column({ default: true })
  public isActive!: boolean;

  @CreateDateColumn()
  public createdAt!: Date;

  @UpdateDateColumn()
  public updatedAt!: Date;

  //#endregion

  //#region Protected Properties

  protected extras: Partial<TExtra> = {};

  //#endregion

  //#region Public Methods

  public setExtra<TKey extends keyof TExtra>(key: TKey, value: TExtra[TKey]): void {
    this.extras[key] = value;
  }

  public getExtra<TKey extends keyof TExtra>(key: TKey): TExtra[TKey] | undefined {
    return this.extras[key];
  }

  //#endregion

}
