export type BuildTuple<
  T extends number,
  A extends never[] = [],
> = A['length'] extends T ? A : BuildTuple<T, [never, ...A]>
