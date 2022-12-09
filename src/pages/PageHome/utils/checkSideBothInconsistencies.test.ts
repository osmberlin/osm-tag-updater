import { describe, expect, test } from 'vitest'
import { checkSideBothInconsistencies } from './checkSideBothInconsistencies'

describe('checkSideBothInconsistencies()', () => {
  test('does nothing if nothis ammis', () => {
    const result = checkSideBothInconsistencies([
      'parking:left=yes',
      'parking:right=no',
      'parking:both:orientation=foo',
    ])

    expect([]).toMatchObject(result)
  })

  test('returns the inconsistent keys', () => {
    const result = checkSideBothInconsistencies([
      'parking:left=yes',
      'parking:both=no',
      'parking:right:something=lorem',
      'parking:both:something=ipsum',
      'parking:both:orientation=foo',
    ])

    const check = [
      ['parking:both', 'parking:left'],
      ['parking:both:something', 'parking:right:something'],
    ]
    expect(check).toMatchObject(result)
  })
})
