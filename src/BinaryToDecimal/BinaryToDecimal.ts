import { BuildTuple } from '../utils/arithmetic'

type Binary = 0 | 1
type BitString = '0' | '1'
type ToBit<T extends BitString> = T extends '1' ? 1 : T extends '0' ? 0 : never

export type Extract4Bit<T extends string> =
  T extends `${infer D1 extends BitString}${infer D2 extends BitString}${infer D3 extends BitString}${infer D4 extends BitString}`
    ? [ToBit<D1>, ToBit<D2>, ToBit<D3>, ToBit<D4>]
    : never

// 基数変換(2進数タプルから10進数リテラル)

export type BuildDecimalNumber<B extends Binary[]> = [
  ...BuildTuple<B[3]>,
  ...BuildTuple<B[2] extends 1 ? 2 : B[2] extends 0 ? 0 : never>,
  ...BuildTuple<B[1] extends 1 ? 4 : B[1] extends 0 ? 0 : never>,
  ...BuildTuple<B[0] extends 1 ? 8 : B[0] extends 0 ? 0 : never>,
]['length']
