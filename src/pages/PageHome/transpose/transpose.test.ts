import { describe, expect, test } from 'vitest'
import { transpose } from './transpose'
import { TagsStringArray } from './types'

describe('transpose()', () => {
  test('no input, no output', () => {
    const input: TagsStringArray = []
    const result = transpose(input)

    const compare = {
      ignoredTags: [],
      newTagObjects: {},
      newTagsManualCandidates: [],
    }
    expect(result).toMatchObject(compare)
  })

  test('cleanup tabs', () => {
    const input: TagsStringArray = [' parking:lane:left	=	separate ']
    const result = transpose(input)

    const compare = {
      'parking:lane:left=separate': {
        compare: 'tag',
        newTags: ['parking:left=separate'],
      },
    }
    expect(result.newTagObjects).toMatchObject(compare)
  })

  test('handles ignoredTags and manual candidates', () => {
    const input: TagsStringArray = ['foo=bar', 'parking:lane:unknown=unknown']
    const result = transpose(input)

    const compare = {
      ignoredTags: ['foo=bar'],
      newTagsManualCandidates: ['parking:lane:unknown=unknown'],
      newTagObjects: {},
    }
    expect(result).toMatchObject(compare)
  })

  test('handles tags with multiple @-signs as `ignoredTags` to be handled manually', () => {
    const input: TagsStringArray = [
      'parking:lane:foo=some @ (value); other @ value',
    ]
    const result = transpose(input)

    const compare = {
      ignoredTags: [],
      newTagsManualCandidates: [
        'parking:lane:foo=some @ (value); other @ value',
      ],
      newTagObjects: {},
    }
    expect(result).toMatchObject(compare)
  })

  test('handles just keys as input as `ignoredTags` to be handled manually', () => {
    const input: TagsStringArray = ['parking:lane:foo']
    const result = transpose(input)

    const compare = {
      ignoredTags: [],
      newTagsManualCandidates: ['parking:lane:foo'],
      newTagObjects: {},
    }
    expect(result).toMatchObject(compare)
  })

  describe('compare type _tag_', () => {
    test('handles compare type tag', () => {
      const input: TagsStringArray = ['parking:lane:left=yes']
      const result = transpose(input)

      // console.log('result', JSON.stringify(result.newTagObjects, undefined, 2))
      const compare = {
        'parking:lane:left=yes': {
          compare: 'tag',
          newTags: ['parking:left=yes'],
        },
      }
      expect(result.newTagObjects).toMatchObject(compare)
    })
  })

  describe('compare type _key_', () => {
    test('handles compare type key, preserve value', () => {
      const input: TagsStringArray = ['parking:lane:left:capacity=1337']
      const result = transpose(input)

      console.log('result', JSON.stringify(result, undefined, 2))
      const compare = {
        'parking:lane:left:capacity=1337': {
          compare: 'key',
          newTags: ['parking:left:capacity=1337'],
        },
      }
      expect(result.newTagObjects).toMatchObject(compare)
    })
  })

  describe('compare type _regex_', () => {
    test('handles compare type regex, preserve value', () => {
      const input: TagsStringArray = [
        'parking:condition:left:conditional=disabled @ (Mo-Fr 08:00-18:00)',
      ]
      const result = transpose(input)

      console.log('result', JSON.stringify(result, undefined, 2))
      const compare = {
        'parking:condition:left:conditional=disabled @ (Mo-Fr 08:00-18:00)': {
          compare: 'regex',
          newTags: [
            'parking:left:access:conditional=no @ (Mo-Fr 08:00-18:00)',
            'parking:left:disabled:conditional=designated @ (Mo-Fr 08:00-18:00)',
          ],
        },
      }
      expect(result.newTagObjects).toMatchObject(compare)
    })
  })
})
