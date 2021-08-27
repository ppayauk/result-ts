import { isErr, unwrap, isOk } from '../result'
import { safeAsync } from '.'

describe('safeAsync', () => {
  it('Should return ok', async () => {
    const myAsyncFunction = (): Promise<string> => Promise.resolve('Hello')
    const mySafeAsyncFunction = safeAsync(myAsyncFunction)

    const result = await mySafeAsyncFunction()

    if (isErr(result)) {
      throw new Error('Should return ok')
    }
    const resultU = unwrap(result)
    expect(resultU).toBe('Hello')
  })
  it('Should catch immediate errors', async () => {
    const myAsyncFunction = (): Promise<string> => {
      throw new Error('My Immediate Error')
    }
    const mySafeAsyncFunction = safeAsync(myAsyncFunction)

    const result = await mySafeAsyncFunction()

    if (isOk(result)) {
      throw new Error('Should return err')
    }
    const resultU = unwrap(result)
    if (!(resultU instanceof Error)) {
      throw new TypeError('Should return Error type')
    }
    expect(resultU.message).toBe('My Immediate Error')
  })

  it('Should catch rejection errors', async () => {
    const myAsyncFunction = async (): Promise<string> =>
      Promise.reject(new Error('Rejected'))
    const mySafeAsyncFunction = safeAsync<typeof myAsyncFunction, Error>(
      myAsyncFunction
    )

    const result = await mySafeAsyncFunction()

    if (isOk(result)) {
      throw new Error('Should return err')
    }
    const resultU = unwrap(result)
    expect(resultU.message).toBe('Rejected')
  })

  it('Should map errors', async () => {
    const myAsyncFunction = async (): Promise<string> =>
      Promise.reject(new Error('Rejected'))
    const mySafeAsyncFunction = safeAsync(myAsyncFunction, (error) => ({
      name: 'NAME',
      inner: error as Error,
    }))

    const result = await mySafeAsyncFunction()

    if (isOk(result)) {
      throw new Error('Should return err')
    }
    const resultU = unwrap(result)
    expect(resultU.name).toBe('NAME')
    expect(resultU.inner.message).toBe('Rejected')
  })
})
