import { TypeormPaginationValuesInterface } from '../interfaces/typeorm-pagination-values.interface';
import { GetPaginationQuery } from '../payloads/get-pagination.query';

export function getTypeormPaginationProps(props?: GetPaginationQuery): TypeormPaginationValuesInterface {
  const page = props?.page ?? 0;
  const take = props?.itemsPerPage ?? 5;

  return {
    skip: page * take,
    take,
  };
}
