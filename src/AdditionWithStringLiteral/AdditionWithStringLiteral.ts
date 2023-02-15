type Inc<T extends keyof IncTable> = IncTable[T]

type IncTable = {
  '': '0'
  '0': '1'
  '1': '2'
  '2': '3'
  '3': '4'
  '4': '5'
  '5': '6'
  '6': '7'
  '7': '8'
  '8': '9'
  '9': '0'
}

export type Dec<T extends keyof DecTable> = DecTable[T]

type DecTable = {
  '': '0'
  '0': '9'
  '1': '0'
  '2': '1'
  '3': '2'
  '4': '3'
  '5': '4'
  '6': '5'
  '7': '6'
  '8': '7'
  '9': '8'
}

type Add<A extends keyof IncTable, B extends keyof DecTable> = {
  finish: A
  next: Add<Inc<A>, Dec<B>>
}[B extends '0' ? 'finish' : 'next']

// 桁上りするかどうか
type IsCarry<A extends keyof IncTable, B extends keyof DecTable> = {
  finishFalse: false
  finishTrue: true
  next: IsCarry<Inc<A>, Dec<B>>
}[B extends '0' ? 'finishFalse' : A extends '0' ? 'finishTrue' : 'next']

// 数字リテラルなどを文字列に
type ToString<A extends number> = `${A}`

// 先頭文字以外の残りの文字を取る。一文字の場合は空文字を返す
type Tail<T> = T extends `${string}${infer T}` ? T : ''

// 文字列を逆にして返す
type Reverse<A extends string> = A extends `${infer H}${infer T}`
  ? `${Reverse<T>}${H}`
  : A

// 文字列A,Bを単純にくっつける
type Concat<A, B> = A extends string
  ? B extends string
    ? `${A}${B}`
    : never
  : never

// 先頭文字を取る
type Head<T> = T extends `${infer H}${any}` ? H : '0'

type SumS<
  A extends string,
  B extends string,
  Agg = '',
  C = false,
> = `${A}${B}` extends ''
  ? C extends true
    ? Concat<'1', Agg>
    : Agg
  : SumS<
      Tail<A>,
      Tail<B>,
      Concat<Add<C extends true ? Add<Head<A>, '1'> : Head<A>, Head<B>>, Agg>,
      Add<Head<A>, '1'> extends '0'
        ? true
        : IsCarry<C extends true ? Add<Head<A>, '1'> : Head<A>, Head<B>>
    >

// More specific inference for constrained 'infer' types in template literal types
// https://github.com/microsoft/TypeScript/pull/48094
type Is<T extends U, U> = T

export type Sum<A extends number, B extends number> = SumS<
  Reverse<ToString<A>>,
  Reverse<ToString<B>>
> extends `${Is<infer T, number>}`
  ? T
  : never

type g = Sum<34939, 488343> // 523282
//    ^? type g = 523282
