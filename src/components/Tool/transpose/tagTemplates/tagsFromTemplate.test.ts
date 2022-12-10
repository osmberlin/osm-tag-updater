import { describe, expect, test } from 'vitest'
import { tagsFromTemplate } from './tagsFromTemplate'
import { TagsNewTagsObjects } from './types'

describe('tagsFromTemplate()', () => {
  describe('handle {SIDE}', () => {
    test('one key, one value', () => {
      const input: TagsNewTagsObjects = {
        'parking:lane:{SIDE}=yes': {
          compare: 'tag',
          newTags: ['parking:{SIDE}=yes'],
        },
      }
      const { compareByTag: result } = tagsFromTemplate(input)

      // console.log('result', JSON.stringify(result, undefined, 2))
      const compare = {
        'parking:lane:left=yes': {
          compare: 'tag',
          newTags: ['parking:left=yes'],
        },
        'parking:lane:right=yes': {
          compare: 'tag',
          newTags: ['parking:right=yes'],
        },
        'parking:lane:both=yes': {
          compare: 'tag',
          newTags: ['parking:both=yes'],
        },
      }
      expect(result).toMatchObject(compare)
    })

    test('one key, one value, with missingTag key', () => {
      const input: TagsNewTagsObjects = {
        'parking:lane:{SIDE}=marked': {
          compare: 'tag',
          newTags: ['parking:{SIDE}:markings=yes'],
          missingField: {
            key: 'parking:{SIDE}:orientation',
            values: ['foo'],
            msg: 'MSG',
          },
        },
      }
      const { compareByTag: result } = tagsFromTemplate(input)

      // console.log('result', JSON.stringify(result, undefined, 2))
      const compare = {
        'parking:lane:left=marked': {
          compare: 'tag',
          newTags: ['parking:left:markings=yes'],
          missingField: {
            key: 'parking:left:orientation',
            values: ['foo'],
            msg: 'MSG',
          },
        },
        'parking:lane:right=marked': {
          compare: 'tag',
          newTags: ['parking:right:markings=yes'],
          missingField: {
            key: 'parking:right:orientation',
            values: ['foo'],
            msg: 'MSG',
          },
        },
        'parking:lane:both=marked': {
          compare: 'tag',
          newTags: ['parking:both:markings=yes'],
          missingField: {
            key: 'parking:both:orientation',
            values: ['foo'],
            msg: 'MSG',
          },
        },
      }
      expect(result).toMatchObject(compare)
    })

    test('two keys, two values', () => {
      const input: TagsNewTagsObjects = {
        'parking:lane:{SIDE}=no_stopping': {
          compare: 'tag',
          newTags: ['parking:{SIDE}=no', 'parking:{SIDE}:stopping=no'],
        },
        'parking:condition:{SIDE}=disabled': {
          compare: 'tag',
          newTags: [
            'parking:{SIDE}:access=no',
            'parking:{SIDE}:disabled=designated',
          ],
        },
        'parking:lane:{SIDE}:capacity': {
          compare: 'key',
          newTags: ['parking:{SIDE}:capacity'],
        },
      }
      const { compareByTag, compareByKey } = tagsFromTemplate(input)

      // console.log('result', JSON.stringify(result, undefined, 2))
      const compareFromTag = {
        'parking:lane:left=no_stopping': {
          compare: 'tag',
          newTags: ['parking:left=no', 'parking:left:stopping=no'],
        },
        'parking:lane:right=no_stopping': {
          compare: 'tag',
          newTags: ['parking:right=no', 'parking:right:stopping=no'],
        },
        'parking:lane:both=no_stopping': {
          compare: 'tag',
          newTags: ['parking:both=no', 'parking:both:stopping=no'],
        },
        'parking:condition:left=disabled': {
          compare: 'tag',
          newTags: [
            'parking:left:access=no',
            'parking:left:disabled=designated',
          ],
        },
        'parking:condition:right=disabled': {
          compare: 'tag',
          newTags: [
            'parking:right:access=no',
            'parking:right:disabled=designated',
          ],
        },
        'parking:condition:both=disabled': {
          compare: 'tag',
          newTags: [
            'parking:both:access=no',
            'parking:both:disabled=designated',
          ],
        },
      }
      const compareFromKey = {
        'parking:lane:left:capacity': {
          compare: 'key',
          newTags: ['parking:left:capacity'],
        },
        'parking:lane:right:capacity': {
          compare: 'key',
          newTags: ['parking:right:capacity'],
        },
        'parking:lane:both:capacity': {
          compare: 'key',
          newTags: ['parking:both:capacity'],
        },
      }
      expect(compareByTag).toMatchObject(compareFromTag)
      expect(compareByKey).toMatchObject(compareFromKey)
    })
  })

  describe('handle {TYPE}', () => {
    test('Works with {TYPE} (and {SIDE})', () => {
      const input: TagsNewTagsObjects = {
        'parking:lane:{SIDE}:{TYPE}=on_street': {
          compare: 'tag',
          newTags: ['parking:{SIDE}=lane'],
        },
      }
      const { compareByTag: result } = tagsFromTemplate(input)

      // console.log('result', JSON.stringify(result, undefined, 2))
      const compare = {
        'parking:lane:left:parallel=on_street': {
          compare: 'tag',
          newTags: ['parking:left=lane'],
        },
        'parking:lane:left:diagonal=on_street': {
          compare: 'tag',
          newTags: ['parking:left=lane'],
        },
        'parking:lane:left:perpendicular=on_street': {
          compare: 'tag',
          newTags: ['parking:left=lane'],
        },
        'parking:lane:right:parallel=on_street': {
          compare: 'tag',
          newTags: ['parking:right=lane'],
        },
        'parking:lane:right:diagonal=on_street': {
          compare: 'tag',
          newTags: ['parking:right=lane'],
        },
        'parking:lane:right:perpendicular=on_street': {
          compare: 'tag',
          newTags: ['parking:right=lane'],
        },
        'parking:lane:both:parallel=on_street': {
          compare: 'tag',
          newTags: ['parking:both=lane'],
        },
        'parking:lane:both:diagonal=on_street': {
          compare: 'tag',
          newTags: ['parking:both=lane'],
        },
        'parking:lane:both:perpendicular=on_street': {
          compare: 'tag',
          newTags: ['parking:both=lane'],
        },
      }
      expect(result).toMatchObject(compare)
    })
  })
})
