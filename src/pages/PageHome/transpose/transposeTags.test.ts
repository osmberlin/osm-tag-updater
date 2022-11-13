import { describe, expect, test } from 'vitest'
import { transposeTags } from './transposeTags'

describe('transposeTags()', () => {
  describe('test SIDE', () => {
    test('Works if nothing has to change, 1 tag', () => {
      const input = { 'foo=a': 'bar=a' }
      const result = transposeTags(input)

      // console.log('result', JSON.stringify(result, undefined, 2))
      expect(Object.keys(result)).toMatch('foo=a')
      expect(result).toMatchObject(input)
    })

    test('Works if nothing has to change, 3 tag', () => {
      const input = {
        'foo=a': 'bar=a',
        'lorem=a': 'ipsum=a',
        'max=a': 'moritz=a',
      }
      const result = transposeTags(input)

      expect(input).toMatchObject(result)
    })

    test('Works with {SIDE}', () => {
      const input = {
        'barOld:{SIDE}:bar': 'barNew:{SIDE}:bar',
        'ipsumOld:{SIDE}': 'ipsumNew:{SIDE}',
        max: 'moritz',
      }
      const result = transposeTags(input)

      // console.log('result', JSON.stringify(result, undefined, 2))
      expect(result).toMatchObject({
        'barOld:left:bar': 'barNew:left:bar',
        'barOld:right:bar': 'barNew:right:bar',
        'barOld:both:bar': 'barNew:both:bar',
        'ipsumOld:left': 'ipsumNew:left',
        'ipsumOld:right': 'ipsumNew:right',
        'ipsumOld:both': 'ipsumNew:both',
        max: 'moritz',
      })
    })
  })

  describe('test TYPE', () => {
    test('Works with {TYPE} (and {SIDE})', () => {
      const input = {
        'barOld:{SIDE}:{TYPE}:bar=a': 'barNew:{SIDE}:{TYPE}:bar=a',
        'ipsumOld:{SIDE}:{TYPE}=a': 'ipsumNew:{SIDE}={TYPE}',
        'max=a': 'moritz=a',
      }
      const result = transposeTags(input)

      // console.log('result', JSON.stringify(result, undefined, 2))
      expect(result).toMatchObject({
        'max=a': 'moritz=a',
        'barOld:left:parallel:bar=a': 'barNew:left:parallel:bar=a',
        'barOld:left:diagonal:bar=a': 'barNew:left:diagonal:bar=a',
        'barOld:left:perpendicular:bar=a': 'barNew:left:perpendicular:bar=a',
        'barOld:right:parallel:bar=a': 'barNew:right:parallel:bar=a',
        'barOld:right:diagonal:bar=a': 'barNew:right:diagonal:bar=a',
        'barOld:right:perpendicular:bar=a': 'barNew:right:perpendicular:bar=a',
        'barOld:both:parallel:bar=a': 'barNew:both:parallel:bar=a',
        'barOld:both:diagonal:bar=a': 'barNew:both:diagonal:bar=a',
        'barOld:both:perpendicular:bar=a': 'barNew:both:perpendicular:bar=a',
        'ipsumOld:left:parallel=a': 'ipsumNew:left=parallel',
        'ipsumOld:left:diagonal=a': 'ipsumNew:left=diagonal',
        'ipsumOld:left:perpendicular=a': 'ipsumNew:left=perpendicular',
        'ipsumOld:right:parallel=a': 'ipsumNew:right=parallel',
        'ipsumOld:right:diagonal=a': 'ipsumNew:right=diagonal',
        'ipsumOld:right:perpendicular=a': 'ipsumNew:right=perpendicular',
        'ipsumOld:both:parallel=a': 'ipsumNew:both=parallel',
        'ipsumOld:both:diagonal=a': 'ipsumNew:both=diagonal',
        'ipsumOld:both:perpendicular=a': 'ipsumNew:both=perpendicular',
      })
    })
  })
})
