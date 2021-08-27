export type { Err, Ok, Result } from './result'
export {
  err,
  ok,
  isErr,
  isOk,
  unwrap,
  mapOk,
  mapErr,
  flattenArray,
  flattenRecord,
} from './result'
export { safe } from './safe'
export { safeAsync } from './safeAsync'
