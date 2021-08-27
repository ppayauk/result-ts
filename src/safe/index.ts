import { Result, ok, err, Err } from '../result'

/* eslint-disable-next-line @typescript-eslint/no-explicit-any */
type AnyFunction = (...args: ReadonlyArray<any>) => any

// Type for a safe version of a function F
export type Safe<F extends AnyFunction, E> = (
  ...args: Parameters<F>
) => Result<ReturnType<F>, E>

export type MakeTypedError<E> = (error: unknown) => E

// Type of function that takes an unknown error and makes a typed Error
export type MakeSafe = <F extends AnyFunction, E>(
  f: F,
  makeErr?: MakeTypedError<E>
) => Safe<F, E>

// Wrap a function in a try catch and return a Result
export const safe: MakeSafe = function safe<F extends AnyFunction, E>(
  f: F,
  makeErr?: MakeTypedError<E>
) {
  /* eslint-disable-next-line functional/functional-parameters */
  return (...args) => {
    /* eslint-disable-next-line functional/no-try-statement */
    try {
      return ok(f(...args))
    } catch (error) {
      if (makeErr) {
        return err(makeErr(error))
      }
      return err(error) as Err<E>
    }
  }
}
