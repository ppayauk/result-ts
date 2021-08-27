import { isErr, unwrap, isOk } from '../result'
import { safe } from '.'

describe('safe', () => {
  it('Should run function', () => {
    const f = (a: string): string => `hello ${a}`
    const safeF = safe(f)
    const safeResult = safeF('james')
    if (isErr(safeResult)) {
      throw new Error('Should be ok')
    }
    expect(unwrap(safeResult)).toBe('hello james')
  })

  it('Should return error', () => {
    const f = (_: string): string => {
      const e = new Error('MESSAGE')
      throw e
    }
    const safeF = safe<typeof f, Error>(f)
    const safeResult = safeF('james')
    if (isOk(safeResult)) {
      throw new Error('Should be err')
    }
    const myError = unwrap(safeResult)
    expect(myError.message).toBe('MESSAGE')
  })

  it('Should map errors', () => {
    const f = (_: string): string => {
      const e = new Error('MESSAGE')
      throw e
    }
    const safeF = safe(f, (error) => {
      if (error instanceof Error) {
        return {
          message: 'MY MESSAGE',
          inner: error,
        }
      }
      throw new Error('Unknown Error')
    })
    const safeResult = safeF('james')
    if (isOk(safeResult)) {
      throw new Error('Should be err')
    }
    const myError = unwrap(safeResult)
    expect(myError.message).toBe('MY MESSAGE')
    expect(myError.inner.message).toBe('MESSAGE')
  })
})
