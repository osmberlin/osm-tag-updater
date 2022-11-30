import { describe, expect, test } from 'vitest'
import { tagsFromTemplate } from './tagsFromTemplate'
import { TagsNewTagsObjects } from './types'

describe('tagsFromTemplate()', () => {
  describe('handle {SIDE}', () => {
    test('one key, one value', () => {
      const input: TagsNewTagsObjects = {
        'parking:lane:{SIDE}=yes': {
          newTags: ['parking:{SIDE}=yes'],
        },
      }
      const result = tagsFromTemplate(input)

      // console.log('result', JSON.stringify(result, undefined, 2))
      const compare = {
        'parking:lane:left=yes': {
          newTags: ['parking:left=yes'],
        },
        'parking:lane:right=yes': {
          newTags: ['parking:right=yes'],
        },
        'parking:lane:both=yes': {
          newTags: ['parking:both=yes'],
        },
      }
      expect(result).toMatchObject(compare)
    })

    test('one key, one value, with missingTag key', () => {
      const input: TagsNewTagsObjects = {
        'parking:lane:{SIDE}=marked': {
          newTags: ['parking:{SIDE}:markings=yes'],
          missingField: {
            key: 'parking:{SIDE}:orientation',
            values: ['foo'],
            msg: 'MSG',
          },
        },
      }
      const result = tagsFromTemplate(input)

      // console.log('result', JSON.stringify(result, undefined, 2))
      const compare = {
        'parking:lane:left=marked': {
          newTags: ['parking:left:markings=yes'],
          missingField: {
            key: 'parking:left:orientation',
            values: ['foo'],
            msg: 'MSG',
          },
        },
        'parking:lane:right=marked': {
          newTags: ['parking:right:markings=yes'],
          missingField: {
            key: 'parking:right:orientation',
            values: ['foo'],
            msg: 'MSG',
          },
        },
        'parking:lane:both=marked': {
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
          newTags: ['parking:{SIDE}=no', 'parking:{SIDE}:stopping=no'],
        },
        'parking:condition:{SIDE}=disabled': {
          newTags: [
            'parking:{SIDE}:access=no',
            'parking:{SIDE}:disabled=designated',
          ],
        },
      }
      const result = tagsFromTemplate(input)

      // console.log('result', JSON.stringify(result, undefined, 2))
      const compare = {
        'parking:lane:left=no_stopping': {
          newTags: ['parking:left=no', 'parking:left:stopping=no'],
        },
        'parking:lane:right=no_stopping': {
          newTags: ['parking:right=no', 'parking:right:stopping=no'],
        },
        'parking:lane:both=no_stopping': {
          newTags: ['parking:both=no', 'parking:both:stopping=no'],
        },
        'parking:condition:left=disabled': {
          newTags: [
            'parking:left:access=no',
            'parking:left:disabled=designated',
          ],
        },
        'parking:condition:right=disabled': {
          newTags: [
            'parking:right:access=no',
            'parking:right:disabled=designated',
          ],
        },
        'parking:condition:both=disabled': {
          newTags: [
            'parking:both:access=no',
            'parking:both:disabled=designated',
          ],
        },
      }
      expect(result).toMatchObject(compare)
    })
  })

  describe('handle {TYPE}', () => {
    test('Works with {TYPE} (and {SIDE})', () => {
      const input: TagsNewTagsObjects = {
        'parking:lane:{SIDE}:{TYPE}=on_street': {
          newTags: ['parking:{SIDE}=lane'],
        },
      }
      const result = tagsFromTemplate(input)

      // console.log('result', JSON.stringify(result, undefined, 2))
      const compare = {
        'parking:lane:left:parallel=on_street': {
          newTags: ['parking:left=lane'],
        },
        'parking:lane:left:diagonal=on_street': {
          newTags: ['parking:left=lane'],
        },
        'parking:lane:left:perpendicular=on_street': {
          newTags: ['parking:left=lane'],
        },
        'parking:lane:right:parallel=on_street': {
          newTags: ['parking:right=lane'],
        },
        'parking:lane:right:diagonal=on_street': {
          newTags: ['parking:right=lane'],
        },
        'parking:lane:right:perpendicular=on_street': {
          newTags: ['parking:right=lane'],
        },
        'parking:lane:both:parallel=on_street': {
          newTags: ['parking:both=lane'],
        },
        'parking:lane:both:diagonal=on_street': {
          newTags: ['parking:both=lane'],
        },
        'parking:lane:both:perpendicular=on_street': {
          newTags: ['parking:both=lane'],
        },
      }
      expect(result).toMatchObject(compare)
    })
  })
})
