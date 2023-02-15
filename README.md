# Meta typing sandbox

Playing with the TypeScript type system.

⚠️Note: This project is for fun, not for practical use.

## Radix Conversion

[Conversion from binary to decimal](./src/BinaryToDecimal/BinaryToDecimal.ts)

## Arithmetic

[Addition with string literal](./src/AdditionWithStringLiteral/AdditionWithStringLiteral.ts)

Usually, addition in a type system uses a tuple type, but there was a limitation that it could not calculate more than 10000.

However, since TypeScript 4.8, it has become easier to convert strings to numbers, and [I saw this post](https://github.com/microsoft/TypeScript/pull/48094#issuecomment-1134232924).
I tried to imitate it and tried another way of addition by string type.

## Sorting algorithm

[Quick sort](./src/QuickSort/QuickSort.ts)

Efficient, general-purpose sorting algorithm. [See also](https://en.wikipedia.org/wiki/Quicksort)
