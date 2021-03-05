export class Paginator<T> {
  constructor(
    public page: number,
    public hasMore: boolean,
    public items: T[]) { }
}