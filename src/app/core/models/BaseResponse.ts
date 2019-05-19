/*
https://swapi.co/documentation
*/

export class BaseResponse<T> {
  count: number;
  next: string;
  previous: string;
  results: T;
}
