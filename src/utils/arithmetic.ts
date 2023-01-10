export type BuildTuple<
  T extends number,
  A extends never[] = [],
> = T extends A['length'] ? A : BuildTuple<T, [never, ...A]>
