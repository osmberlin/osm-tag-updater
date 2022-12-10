import { describe, expect, test } from 'vitest'
import { count } from './count'

describe('count()', () => {
  test('retuns 0 if input empty', () => {
    const result = count('', '@')
    expect(0).toMatchObject(result)
  })

  test('retuns 1', () => {
    const result = count('no @ (foo)', '@')
    expect(1).toMatchObject(result)
  })

  test('retuns 2', () => {
    const result = count('no @ (foo); yes @ bar', '@')
    expect(2).toMatchObject(result)
  })
})
