type B = 1 | 0

type Or<T extends B, K extends B> = {
  0: {
    0: 0
    1: 1
  }
  1: {
    0: 1
    1: 1
  }
}[T][K]

type And<T extends B, K extends B> = {
  0: {
    0: 0
    1: 0
  }
  1: {
    0: 0
    1: 1
  }
}[T][K]

// exclusive or
type Xor<T extends B, K extends B> = {
  0: {
    0: 0
    1: 1
  }
  1: {
    0: 1
    1: 0
  }
}[T][K]

type Nor<T extends B, K extends B> = {
  0: {
    0: 1
    1: 0
  }
  1: {
    0: 0
    1: 0
  }
}[T][K]

type Not<T extends B> = {
  0: 1
  1: 0
}[T]

type Nand<T extends B, K extends B> = {
  0: {
    0: 1
    1: 1
  }
  1: {
    0: 1
    1: 0
  }
}[T][K]

type HalfAdder<T extends B, K extends B> = {
  carry: And<T, K>
  sum: Xor<T, K>
}

type FullAdder<Carry extends B, T extends B, K extends B> = {}
