import { Result, err, ok, unwrap, isErr } from '../../src'

type DivideByZero = {
  readonly type: 'DivideByZero'
}
type NANInput = {
  readonly type: 'NANInput'
}
type InfinateInput = {
  readonly type: 'InfinateInput'
}
type DivisionError = DivideByZero | NANInput | InfinateInput

function functionThatCanFailWithError(
  a: number,
  b: number
): Result<number, DivisionError> {
  if (b === 0) {
    return err({
      type: 'DivideByZero',
    })
  } else {
    return ok(a / b)
  }
}

export function functionThatInspectsError(a: number, b: number): string {
  const result = functionThatCanFailWithError(a, b)
  if (isErr(result)) {
    switch (unwrap(result).type) {
      case 'DivideByZero': {
        return 'Attempted to divide by 0'
      }
      case 'InfinateInput': {
        return 'One of the inputs was infinate'
      }
      case 'NANInput': {
        return 'One of the inputs was NaN'
      }
    }
  }
  return 'ok'
}
