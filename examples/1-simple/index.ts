import { Result, err, ok, unwrap, isErr } from '../../src'

function functionThatCanFail(a: number, b: number): Result<number, string> {
  if (b === 0) {
    return err('B was 0')
  } else {
    return ok(a / b)
  }
}

export function functionThatUsesFunctionThatCanFail(
  a: number,
  b: number
): Result<string, string> {
  const result = functionThatCanFail(a, b)
  if (isErr(result)) {
    return result
  }
  return ok('ok')
}
