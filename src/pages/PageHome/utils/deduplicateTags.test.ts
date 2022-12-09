import { describe, expect, test } from 'vitest'
import { deduplicateTags } from './deduplicateTags'

describe('deduplicateTags()', () => {
  test('removes duplicates', () => {
    const result = deduplicateTags(['parking:left=yes', 'parking:left=yes'])
    expect(['parking:left=yes']).toMatchObject(result)
  })

  test('keeps non duplicates', () => {
    const input = ['parking:left=yes', 'parking:left:orientation=parallel']
    const result = deduplicateTags(input)
    expect(input).toMatchObject(result)
  })
})
