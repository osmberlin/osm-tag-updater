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
      newTagsManualCandidates: {},
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
      newTagsManualCandidates: {
        'parking:lane:unknown=unknown': {
          compare: 'tag',
          msg: 'something',
          newTags: ['fixme=parking:lane:unknown=unknown'],
        },
      },
      newTagObjects: {},
    }
    expect(result.ignoredTags).toMatchObject(compare.ignoredTags)
    expect(result.newTagObjects).toMatchObject(compare.newTagObjects)
    expect(Object.keys(result.newTagsManualCandidates)).toMatchObject(
      Object.keys(compare.newTagsManualCandidates)
    )
    expect(
      result.newTagsManualCandidates['parking:lane:unknown=unknown'].newTags
    ).toMatchObject(
      compare.newTagsManualCandidates['parking:lane:unknown=unknown'].newTags
    )
  })

  test('handles tags with multiple @-signs as `ignoredTags` to be handled manually', () => {
    const input: TagsStringArray = [
      'parking:lane:foo=some @ (value); other @ value',
    ]
    const result = transpose(input)

    const compare = {
      ignoredTags: [],
      newTagsManualCandidates: {
        'parking:lane:foo=some @ (value); other @ value': {
          compare: 'tag',
          msg: 'This tag contains more than one @-sign. Please update it manually.',
          newTags: ['fixme=parking:lane:foo=some @ (value); other @ value'],
        },
      },
      newTagObjects: {},
    }

    expect(result.ignoredTags).toMatchObject(compare.ignoredTags)
    expect(result.newTagObjects).toMatchObject(compare.newTagObjects)
    expect(Object.keys(result.newTagsManualCandidates)).toMatchObject(
      Object.keys(compare.newTagsManualCandidates)
    )
    expect(
      result.newTagsManualCandidates[
        'parking:lane:foo=some @ (value); other @ value'
      ].newTags
    ).toMatchObject(
      compare.newTagsManualCandidates[
        'parking:lane:foo=some @ (value); other @ value'
      ].newTags
    )
  })

  test('handles just keys as input as `ignoredTags` to be handled manually', () => {
    const input: TagsStringArray = ['parking:lane:foo']
    const result = transpose(input)

    const compare = {
      ignoredTags: [],
      newTagsManualCandidates: {
        'parking:lane:foo': {
          compare: 'tag',
          msg: 'This has has to many or to litte =-signs. Please update it manually.',
          newTags: ['fixme=parking:lane:foo'],
        },
      },
      newTagObjects: {},
    }

    expect(result.ignoredTags).toMatchObject(compare.ignoredTags)
    expect(result.newTagObjects).toMatchObject(compare.newTagObjects)
    expect(Object.keys(result.newTagsManualCandidates)).toMatchObject(
      Object.keys(compare.newTagsManualCandidates)
    )
    expect(
      result.newTagsManualCandidates['parking:lane:foo'].newTags
    ).toMatchObject(compare.newTagsManualCandidates['parking:lane:foo'].newTags)
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

      // console.log('result', JSON.stringify(result, undefined, 2))
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

      // console.log('result', JSON.stringify(result, undefined, 2))
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

  describe('ignore new schema', () => {
    test('only new schema => no output tags', () => {
      const input: TagsStringArray = [
        'parking:both=lane',
        'parking:both:authentication:disc=no',
        'parking:both:fee=no',
        'parking:both:markings=no',
        'parking:both:orientation=parallel',
      ]
      const result = transpose(input)

      // console.log('result', JSON.stringify(result, undefined, 2))
      expect(result.ignoredTags).toMatchObject(input)
      expect(result.newTagObjects).toMatchObject({})
      expect(result.newTagsManualCandidates).toMatchObject({})
    })
  })

  test('mixed old/new schema ignores the new, updates the old', () => {
    const inputIgnore: TagsStringArray = [
      'parking:both=lane',
      'parking:both:authentication:disc=no',
      'parking:both:fee=no',
      'parking:both:markings=no',
      'parking:both:orientation=parallel',
    ]
    const inputTranspose: TagsStringArray = [
      'parking:condition:both=free',
      'parking:lane:both=parallel',
      'parking:lane:both:parallel=on_street',
    ]
    const result = transpose([...inputIgnore, ...inputTranspose])

    // console.log('result', JSON.stringify(result, undefined, 2))
    const compareTagObjects = {
      'parking:condition:both=free': {
        compare: 'tag',
        newTags: ['parking:both:fee=no'],
      },
      'parking:lane:both=parallel': {
        compare: 'tag',
        newTags: ['parking:both:orientation=parallel'],
      },
      'parking:lane:both:parallel=on_street': {
        compare: 'tag',
        newTags: ['parking:both=lane'],
      },
    }
    expect(result.ignoredTags).toMatchObject(inputIgnore)
    expect(result.newTagObjects).toMatchObject(compareTagObjects)
    expect(result.newTagsManualCandidates).toMatchObject({})
  })
})
