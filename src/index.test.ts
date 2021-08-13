/* eslint functional/no-throw-statement:off*/
import {
  ok,
  isOk,
  err,
  isErr,
  unwrap,
  mapOk,
  mapErr,
  flattenArray,
  flattenRecord,
} from '.'
import * as fc from 'fast-check'
import * as R from 'fp-ts/lib/Record'

describe('Ok', () => {
  it('Creates an Ok with value', () => {
    fc.assert(
      fc.property(fc.anything(), (anyValue) => {
        ok(anyValue)
      })
    )
  })
  it('isOk', () => {
    fc.assert(
      fc.property(fc.anything(), (anyValue) => {
        const myOk = ok(anyValue)
        expect(isOk(myOk)).toBeTruthy()
        expect(isErr(myOk)).toBeFalsy()
      })
    )
  })
})

describe('Err', () => {
  it('Creates an Err with an Error', () => {
    fc.assert(
      fc.property(fc.anything(), (anyValue) => {
        err(anyValue)
      })
    )
  })
  it('isErr', () => {
    fc.assert(
      fc.property(fc.anything(), (anyValue) => {
        const myErr = err(anyValue)
        expect(isOk(myErr)).toBeFalsy()
        expect(isErr(myErr)).toBeTruthy()
      })
    )
  })
})

describe('uwrap', () => {
  it('Should unwrap ok', () => {
    fc.assert(
      fc.property(fc.anything(), (anyValue) => {
        const myResult = ok(anyValue)
        if (isErr(myResult)) {
          throw new Error('Error ensuring ok')
        }
        const myValue = unwrap(myResult)
        expect(myValue).toEqual(anyValue)
      })
    )
  })
  it('Should unwrap error', () => {
    fc.assert(
      fc.property(fc.anything(), (anyValue) => {
        const myResult = err(anyValue)
        if (isOk(myResult)) {
          throw new Error('Error ensuring err')
        }
        const myValue = unwrap(myResult)
        expect(myValue).toEqual(anyValue)
      })
    )
  })
})

describe('mapOk', () => {
  it('should return value returned by onOk function', () => {
    fc.assert(
      fc.property(fc.anything(), fc.anything(), (anyValue, anyValue2) => {
        const myResult = ok(anyValue)
        const nextResult = mapOk(myResult, (okResult) => {
          expect(okResult).toBe(anyValue)
          return anyValue2
        })
        if (isErr(nextResult)) {
          throw new Error('Error ensuring ok')
        }
        expect(unwrap(nextResult)).toBe(anyValue2)
      })
    )
  })
  it('should return error if err', () => {
    fc.assert(
      fc.property(fc.anything(), (anyValue) => {
        const myResult = err(anyValue)
        const nextResult = mapOk(myResult, (_) => {
          throw new Error('Error ensuring err')
        })
        if (isOk(nextResult)) {
          throw new Error('Error ensuring err')
        }
        expect(unwrap(nextResult)).toBe(anyValue)
      })
    )
  })
})

describe('mapErr', () => {
  it('should return value returned by onErr function', () => {
    fc.assert(
      fc.property(fc.anything(), fc.anything(), (anyValue, anyValue2) => {
        const myResult = err(anyValue)
        const nextResult = mapErr(myResult, (okResult) => {
          expect(okResult).toBe(anyValue)
          return anyValue2
        })
        if (isOk(nextResult)) {
          throw new Error('Error ensuring er')
        }
        expect(unwrap(nextResult)).toBe(anyValue2)
      })
    )
  })
  it('should return error if err', () => {
    fc.assert(
      fc.property(fc.anything(), (anyValue) => {
        const myResult = ok(anyValue)
        const nextResult = mapErr(myResult, (_) => {
          throw new Error('Error ensuring ok')
        })
        if (isErr(nextResult)) {
          throw new Error('Error ensuring ok')
        }
        expect(unwrap(nextResult)).toBe(anyValue)
      })
    )
  })
})
describe('flattenArray', () => {
  it("Flattens list of ok's", () => {
    fc.assert(
      fc.property(fc.array(fc.anything()), (arrayOfAny) => {
        const arrayOfOks = arrayOfAny.map((anything) => {
          return ok(anything)
        })
        const flattend = flattenArray(arrayOfOks)
        expect(flattend).toEqual(ok(arrayOfAny))
      })
    )
  })
  it("Flattens list of err's", () => {
    fc.assert(
      fc.property(fc.array(fc.anything(), { minLength: 1 }), (arrayOfAny) => {
        const arrayOfErrs = arrayOfAny.map((anything) => {
          return err(anything)
        })
        const flattend = flattenArray(arrayOfErrs)
        expect(flattend).toEqual(err(arrayOfAny[0]))
      })
    )
  })
  it("Flattens list of mixed errors's and ok's", () => {
    fc.assert(
      fc.property(fc.array(fc.anything(), { minLength: 2 }), (arrayOfAny) => {
        const arrayOfErrs = arrayOfAny.map((anything, index) => {
          if (index === 0) {
            return ok(err)
          }
          return err(anything)
        })
        const flattend = flattenArray(arrayOfErrs)
        expect(flattend).toEqual(err(arrayOfAny[1]))
      })
    )
  })
})
describe('flattenRecord', () => {
  it("Flattens record of ok's", () => {
    const oks = { A: ok(1), B: ok(2), C: ok(3) }
    const flattend = flattenRecord(oks)
    expect(flattend).toEqual(
      ok({
        A: 1,
        B: 2,
        C: 3,
      })
    )
  })
  it("Flattens record of errors's", () => {
    const oks = { A: err(1), B: err(2), C: err(3) }
    const flattend = flattenRecord(oks)
    expect(flattend).toEqual(err(1))
  })
  it("Flattens record of mixed errors's and ok's", () => {
    const oks = { A: ok(1), B: err(2), C: err(3) }
    const flattend = flattenRecord(oks)
    expect(flattend).toEqual(err(2))
  })
  it("Flattens record of random ok's", () => {
    fc.assert(
      fc.property(
        fc.record({
          a: fc.anything(),
          b: fc.anything(),
          c: fc.anything(),
        }),
        (recordOfAny) => {
          const recordOfResults = R.map((a) => ok(a))(recordOfAny)
          const flattend = flattenRecord(recordOfResults)
          expect(isOk(flattend)).toBeTruthy()
          mapOk(flattend, (okRecord) => {
            expect(okRecord).toEqual(recordOfAny)
          })
        }
      )
    )
  })
  it("Flattens record of random err's", () => {
    fc.assert(
      fc.property(
        fc.record({
          c: fc.anything(),
          a: fc.anything(),
          b: fc.anything(),
        }),
        (recordOfAny) => {
          const recordOfResults = R.map((a) => err(a))(recordOfAny)
          const flattend = flattenRecord(recordOfResults)
          expect(isErr(flattend)).toBeTruthy()
          mapErr(flattend, (errFirst) => {
            expect(errFirst).toEqual(recordOfAny.a)
          })
        }
      )
    )
  })
  it('Flattens record errors in order', () => {
    fc.assert(
      fc.property(
        fc.record({
          '1': fc.anything(),
          a: fc.anything(),
          b: fc.anything(),
        }),
        (recordOfAny) => {
          const recordOfResults = R.map((a) => err(a))(recordOfAny)
          const flattend = flattenRecord(recordOfResults)
          expect(isErr(flattend)).toBeTruthy()
          mapErr(flattend, (errFirst) => {
            expect(errFirst).toEqual(recordOfAny['1'])
          })
        }
      )
    )
  })
})
