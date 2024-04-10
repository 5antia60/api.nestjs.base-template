import { CrudRequest } from '@rewiko/crud';
import { ParsedRequestParams, SField } from '@rewiko/crud-request';
import { CrudRequestOptions } from '@rewiko/crud/lib/interfaces';

export type SFieldsOriginal<T> = {
  $or?: Array<SFieldsTyped<T> | SConditionANDTyped<T>>;
  $and?: never;
}

// ref: https://stackoverflow.com/a/58436959/8741188
type Join<K, P> = K extends string | number ?
  P extends string | number ?
    `${K}${'' extends P ? '' : '.'}${P}`
    : never : never;

type Prev = [never, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10,
  11, 12, 13, 14, 15, 16, 17, 18, 19, 20, ...0[]]

type Leaves<T, D extends number = 3> = [D] extends [never]
  ? never
  : T extends Date
    ? ''
    : T extends object
      ? { [K in keyof T]-?: Join<K, Leaves<T[K], Prev[D]>> }[keyof T]
      : '';

export type SFieldsTyped<T, Keys extends PropertyKey = Leaves<T>> = {
                                [K in Keys]?: SField | Array<SFieldsTyped<T> | SConditionANDTyped<T>> | undefined;
                              } & SFieldsOriginal<T>;

export type SConditionANDTyped<T> = {
  $and?: Array<SFieldsTyped<T> | SConditionANDTyped<T>>;
  $or?: never;
};

export type SConditionTyped<T> = SFieldsTyped<T> | SConditionANDTyped<T>;

export interface ParsedRequestParamsTyped<T> extends ParsedRequestParams {
  search: SConditionTyped<T>;
}

export interface CrudRequestTyped<T> extends CrudRequest {
  parsed: ParsedRequestParamsTyped<T>;
  options: CrudRequestOptions;
}

export function createFindWhereFilter<TEntity>(crudRequest: CrudRequestTyped<TEntity>): object {
  const filters = {};

  if (crudRequest.parsed.filter)
    Object.keys(crudRequest.parsed.filter).forEach(key => filters[key] = crudRequest.parsed.filter[key]);

  return filters;
}