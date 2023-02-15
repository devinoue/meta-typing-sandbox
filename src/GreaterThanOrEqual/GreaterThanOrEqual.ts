type Dec<L extends number> = Subtract<L, 1>

type Length<T extends never[]> = T extends { length: infer L } ? L : never
type BuildTuple<L extends number, T extends never[] = []> = T extends {
  length: L
}
  ? T
  : BuildTuple<L, [...T, never]>

type Subtract<A extends number, B extends number> = BuildTuple<A> extends [
  ...infer U extends never[],
  ...BuildTuple<B>,
]
  ? Length<U>
  : never

export type IsNever<T> = T extends never ? true : false
type IsNeverAndNever<A, B> = [A] extends [never]
  ? [B] extends [never]
    ? true
    : false
  : false

export type Gte<A extends number, B extends number> = {
  equal: true
  greater: true
  next: Gte<Dec<A>, Dec<B>>
  smaller: false
}[IsNeverAndNever<A, B> extends true
  ? 'equal'
  : IsNever<A> extends true
  ? 'smaller'
  : IsNever<B> extends true
  ? 'greater'
  : 'next']

type S1 = Gte<43, 2> // true
//    ^? type S1 = true

type S2 = Gte<2, 3> // false
//    ^? type S2 = false

type S3 = Gte<12, 12> // true
//    ^? type S3 = true
