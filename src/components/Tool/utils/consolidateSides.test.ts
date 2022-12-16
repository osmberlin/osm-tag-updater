import { describe, expect, test } from 'vitest'
import { consolidateSides } from './consolidateSides'

describe('consolidateSides()', () => {
  test('does nothing', () => {
    const result = consolidateSides([
      'parking:left=yes',
      'parking:right:fee=yes',
    ])
    expect(['parking:left=yes', 'parking:right:fee=yes']).toMatchObject(result)
  })

  test('consolidates both+right', () => {
    const result = consolidateSides(['parking:both=yes', 'parking:right=yes'])
    expect(['parking:both=yes']).toMatchObject(result)
  })

  test('consolidates left+right', () => {
    const result = consolidateSides(['parking:left=yes', 'parking:right=yes'])
    expect(['parking:both=yes']).toMatchObject(result)
  })

  test('consolidates multiple and mixed', () => {
    const result = consolidateSides([
      'parking:left=yes',
      'parking:right=yes',
      'parking:left:condition=foo',
      'parking:both:condition=foo',
    ])
    expect(['parking:both:condition=foo', 'parking:both=yes']).toMatchObject(
      result
    )
  })

  test('keeps if values missmatch', () => {
    const input = [
      'parking:left=yes',
      'parking:right=no',
      'parking:left:condition=yes',
      'parking:both:condition=free',
    ]
    const result = consolidateSides(input)
    expect(input).toMatchObject(result)
  })

  test('keeps other tags', () => {
    const result = consolidateSides([
      'parking:left=yes',
      'parking:right=yes',
      'parking:left:fee=foo',
      'parking:both:something=foo',
    ])
    expect([
      'parking:left:fee=foo',
      'parking:both:something=foo',
      'parking:both=yes',
    ]).toMatchObject(result)
  })
})
