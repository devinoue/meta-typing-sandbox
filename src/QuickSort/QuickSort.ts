type Q1 = QuickSort<[32, 4, 3, 6, 12, 1]>
//    ^? type Q1 = [1, 3, 4, 6, 12, 32]

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

export type IsNever<T> = [T] extends [never] ? true : false
type IsNeverAndNever<A, B> = IsNever<A> extends true
  ? IsNever<B> extends true
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

type FilterGte<T extends number[], P extends number> = T extends [
  infer First extends number,
  ...infer Rest extends number[],
]
  ? Gte<First, P> extends true
    ? [First, ...FilterGte<Rest, P>]
    : FilterGte<Rest, P>
  : []

type Pivot = 3
type A1 = FilterGte<[6, 2, 5, 8, 32, 1], Pivot>
//    ^? type A1 = [6, 5, 8, 32]

export type Lt<A extends number, B extends number> = {
  equal: false
  greater: false
  next: Lt<Dec<A>, Dec<B>>
  smaller: true
}[IsNeverAndNever<A, B> extends true
  ? 'equal'
  : IsNever<A> extends true
  ? 'smaller'
  : IsNever<B> extends true
  ? 'greater'
  : 'next']

type L1 = Lt<43, 2> // false
//    ^? type L1 = false

type L2 = Lt<2, 3> // true
//    ^? type L2 = true

type L3 = Lt<12, 12> // true
//    ^? type L3 = false

type FilterLt<T extends number[], P extends number> = T extends [
  infer First extends number,
  ...infer Rest extends number[],
]
  ? Lt<First, P> extends true
    ? [First, ...FilterLt<Rest, P>]
    : FilterLt<Rest, P>
  : []

type A2 = FilterLt<[6, 2, 5, 8, 32, 1], Pivot>
//    ^? type A2 = [2, 1]

type QuickSort<Arr extends number[]> = Arr['length'] extends 0
  ? Arr
  : Arr['length'] extends 1
  ? Arr
  : Arr extends [infer First extends number, ...infer Rest extends number[]]
  ? [
      ...QuickSort<FilterLt<Rest, First>>,
      First,
      ...QuickSort<FilterGte<Rest, First>>,
    ]
  : Arr
