import { describe, expect, test } from 'vitest'
import { morePreciseValueWins } from './morePreciseValueWins'

describe('morePreciseValueWins()', () => {
  test('does nothing', () => {
    const result = morePreciseValueWins([
      'parking:left=yes',
      'parking:right=no',
      'parking:left:lorem=ipsum',
    ])
    expect([
      'parking:left=yes',
      'parking:right=no',
      'parking:left:lorem=ipsum',
    ]).toMatchObject(result)
  })

  test('the more precise value wins', () => {
    const result = morePreciseValueWins([
      'parking:left:foo=yes',
      'parking:left:foo=more_precise',
    ])
    expect(['parking:left:foo=more_precise']).toMatchObject(result)
  })

  test('the more precise value wins', () => {
    // Input:
    // parking:lane:right=yes
    // parking:lane:right:parallel=on_street
    const result = morePreciseValueWins([
      'parking:right=lane',
      'parking:right=yes',
    ])
    expect(['parking:right=lane']).toMatchObject(result)
  })
})
