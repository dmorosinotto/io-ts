import * as t from '../src/index'
import {
  assertSuccess,
  assertFailure,
  assertStrictEqual,
  assertDeepEqual,
  number2
} from './helpers'

describe('object', () => {

  it('should succeed validating a valid value', () => {
    const T = t.object({ a: t.string })
    assertSuccess(t.validate({ a: 's' }, T))
  })

  it('should preserve additional props', () => {
    const T = t.object({ a: t.string })
    assertDeepEqual(t.validate({ a: 's', b: 1 }, T), { a: 's', b: 1 })
  })

  it('should return the same reference if validation succeeded and nothing changed', () => {
    const T = t.object({ a: t.string })
    const value = { a: 's' }
    assertStrictEqual(t.validate(value, T), value)
  })

  it('should return the a new reference if validation succeeded and something changed', () => {
    const T = t.object({ a: number2, b: t.number })
    const value = { a: 1, b: 2, c: 3 }
    assertDeepEqual(t.validate(value, T), { a: 2, b: 2, c: 3 })
  })

  it('should fail validating an invalid value', () => {
    const T = t.object({ a: t.string })
    assertFailure(t.validate(1, T), [
      'Invalid value 1 supplied to : { a: string }'
    ])
    assertFailure(t.validate({}, T), [
      'Invalid value undefined supplied to : { a: string }/a: string'
    ])
    assertFailure(t.validate({ a: 1 }, T), [
      'Invalid value 1 supplied to : { a: string }/a: string'
    ])
  })

  it('should allow for additional props', () => {
    const T = t.object({ a: t.string })
    assertSuccess(t.validate({ a: 's', additional: 2 }, T))
  })

})
