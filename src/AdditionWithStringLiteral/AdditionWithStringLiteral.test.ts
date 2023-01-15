import { Sum } from './AdditionWithStringLiteral'

import { expectType } from 'tsd'

expectType<Sum<1993999, 999999>>(2993998)
