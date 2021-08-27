import { Result, ok, err, Err } from '../result'
import { MakeTypedError } from '../safe'
/* eslint-disable-next-line @typescript-eslint/no-explicit-any */
export type AnyAsyncFunction = (...args: ReadonlyArray<any>) => Promise<any>

export type SafeAsync<F extends AnyAsyncFunction, E> = (
  ...args: Parameters<F>
) => Promise<Result<ReturnType<F>, E>>

export type MakeSafeAsync = <F extends AnyAsyncFunction, E>(
  f: F,
  makeErr?: MakeTypedError<E>
) => SafeAsync<F, E>

export const safeAsync: MakeSafeAsync = function safeAsync<
  F extends AnyAsyncFunction,
  E
>(f: F, makeErr?: MakeTypedError<E>) {
  /* eslint-disable-next-line functional/functional-parameters */
  const safeF: SafeAsync<F, E> = async (...args: Parameters<F>) => {
    /* eslint-disable-next-line functional/no-try-statement */
    try {
      const response = (await f(...args)) as ReturnType<F>
      return ok(response)
    } catch (error: unknown) {
      if (makeErr) {
        return err(makeErr(error))
      }
      return err(error) as Err<E>
    }
  }
  return safeF
}
