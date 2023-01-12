import { expectType } from "tsd";
import { Sum } from "./AdditionWithStringLiteral";

expectType<Sum<1993999,999999>>(2993998)
