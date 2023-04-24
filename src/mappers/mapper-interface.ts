export interface IMapper<T, TU> {
    map(t: T): TU;
}
