import { expectType } from 'tsd'
import { BuildDecimalNumber, Extract4Bit } from './BinaryToDecimal'

expectType<Extract4Bit<'0101'>>([0, 1, 0, 1])
expectType<Extract4Bit<'1101'>>([1, 1, 0, 1])
expectType<Extract4Bit<'0000'>>([0, 0, 0, 0])
expectType<Extract4Bit<'1111'>>([1, 1, 1, 1])
expectType<Extract4Bit<'11111'>>(this as never)

expectType<BuildDecimalNumber<[0, 1, 1, 1]>>(7)
expectType<BuildDecimalNumber<[0, 0, 0, 0]>>(0)
expectType<BuildDecimalNumber<[1, 0, 0, 0]>>(8)
expectType<BuildDecimalNumber<[1, 1, 1, 1]>>(15)
expectType<BuildDecimalNumber<[1, 1, 1, 1, 1]>>(this as never)
