import { describe, expect, test } from 'vitest'
import { transpose } from './transpose'
import { TagsStringArray } from './types'

describe('transpose()', () => {
  test('no input, no output', () => {
    const input: TagsStringArray = []
    const result = transpose(input)

    // console.log('result', JSON.stringify(result, undefined, 2))
    const compare = {
      ignoredTags: [],
      newTags: {},
      unrecognizedTags: [],
    }
    expect(result).toMatchObject(compare)
  })
})
