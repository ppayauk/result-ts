import {
  Right,
  Left,
  isRight,
  isLeft,
  right,
  left,
  map,
  mapLeft,
  Applicative,
} from 'fp-ts/Either'
import * as A from 'fp-ts/lib/ReadonlyArray'
import * as R from 'fp-ts/lib/Record'

export type Ok<TOk> = Right<TOk>
export type Err<TErr> = Left<TErr>
export type Result<TOk, TErr> = Ok<TOk> | Err<TErr>

/* eslint functional/prefer-tacit: off */
/* eslint func-style:off */
export const ok = function ok<TOk = never, TErr = never>(
  value: TOk
): Result<TOk, TErr> {
  return right<TErr, TOk>(value)
}

export function err<TOk = never, TErr = never>(error: TErr): Result<TOk, TErr> {
  return left<TErr, TOk>(error)
}

export function isOk<TOk>(value: Result<TOk, unknown>): value is Ok<TOk> {
  return isRight(value)
}

export function isErr<TErr>(value: Result<unknown, TErr>): value is Err<TErr> {
  return isLeft(value)
}

export function unwrap<TOk>(okVal: Ok<TOk>): TOk
export function unwrap<TErr>(errVal: Err<TErr>): TErr
export function unwrap<TOk, TErr>(okOrErr: Result<TOk, TErr>): TOk | TErr {
  return isOk(okOrErr) ? okOrErr.right : okOrErr.left
}

export function mapOk<TOk, TErr, TNewOk>(
  result: Result<TOk, TErr>,
  onOk: (value: TOk) => TNewOk
): Result<TNewOk, TErr> {
  return map(onOk)(result)
}

export function mapErr<TOk, TErr, TNewErr>(
  result: Result<TOk, TErr>,
  onErr: (err: TErr) => TNewErr
): Result<TOk, TNewErr> {
  return mapLeft(onErr)(result)
}

export function flattenArray<TOk, TError>(
  array: ReadonlyArray<Result<TOk, TError>>
): Result<ReadonlyArray<TOk>, TError> {
  const converter = A.sequence(Applicative)
  return converter(array)
}

export function flattenRecord<
  TOk,
  TError,
  TKey extends string | number | symbol
>(
  record: Record<TKey, Result<TOk, TError>>
): Result<Record<TKey, TOk>, TError> {
  return R.sequence(Applicative)(record) as Result<Record<TKey, TOk>, TError>
}
