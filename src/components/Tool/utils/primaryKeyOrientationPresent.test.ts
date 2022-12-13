import { describe, expect, test } from 'vitest'
import { primaryKeyOrientationPresent } from './primaryKeyOrientationPresent'

describe('checkPrimaryKeyOrientation()', () => {
  test('returns true if no tags at all', () => {
    const result = primaryKeyOrientationPresent([])
    expect(true).toMatchObject(result)
  })

  describe('returns true if both tags are present', () => {
    test('case both+both', () => {
      const result = primaryKeyOrientationPresent([
        'parking:both=yes',
        'parking:both:orientation=parallel',
      ])
      expect(true).toMatchObject(result)
    })
    test('case both+left&right', () => {
      const result = primaryKeyOrientationPresent([
        'parking:both=yes',
        'parking:left:orientation=parallel',
        'parking:right:orientation=parallel',
      ])
      expect(true).toMatchObject(result)
    })
    test('case left+left', () => {
      const result = primaryKeyOrientationPresent([
        'parking:left=yes',
        'parking:left:orientation=parallel',
      ])
      expect(true).toMatchObject(result)
    })
    test('case left+both', () => {
      const result = primaryKeyOrientationPresent([
        'parking:left=yes',
        'parking:both:orientation=parallel',
      ])
      expect(true).toMatchObject(result)
    })
    test('case right+right', () => {
      const result = primaryKeyOrientationPresent([
        'parking:right=yes',
        'parking:right:orientation=parallel',
      ])
      expect(true).toMatchObject(result)
    })
    test('case right+both', () => {
      const result = primaryKeyOrientationPresent([
        'parking:right=yes',
        'parking:both:orientation=parallel',
      ])
      expect(true).toMatchObject(result)
    })
  })

  describe('returns true if no parking or separate parking', () => {
    test('case both', () => {
      const result = primaryKeyOrientationPresent(['parking:both=no'])
      expect(true).toMatchObject(result)
    })
    test('case left+right', () => {
      const result = primaryKeyOrientationPresent([
        'parking:left=no',
        'parking:right=no',
      ])
      expect(true).toMatchObject(result)
    })

    test('case both', () => {
      const result = primaryKeyOrientationPresent(['parking:both=separate'])
      expect(true).toMatchObject(result)
    })
    test('case left+right', () => {
      const result = primaryKeyOrientationPresent([
        'parking:left=separate',
        'parking:right=separate',
      ])
      expect(true).toMatchObject(result)
    })

    test('case left+right', () => {
      const result = primaryKeyOrientationPresent([
        'parking:left=no',
        'parking:right=separate',
      ])
      expect(true).toMatchObject(result)
    })

    test('case left+right', () => {
      const result = primaryKeyOrientationPresent([
        'parking:left=separate',
        'parking:right=no',
      ])
      expect(true).toMatchObject(result)
    })
  })

  describe('returns false when both orientation keys have to exist', () => {
    test('case both+none', () => {
      const result = primaryKeyOrientationPresent(['parking:both=yes'])
      expect(false).toMatchObject(result)
    })
    test('case both+left', () => {
      const result = primaryKeyOrientationPresent([
        'parking:both=yes',
        'parking:left:orientation=parallel',
      ])
      expect(false).toMatchObject(result)
    })
    test('case both+right', () => {
      const result = primaryKeyOrientationPresent([
        'parking:both=yes',
        'parking:right:orientation=parallel',
      ])
      expect(false).toMatchObject(result)
    })
  })

  describe('returns false when left orientation has to to exist', () => {
    test('case left', () => {
      const result = primaryKeyOrientationPresent(['parking:left=yes'])
      expect(false).toMatchObject(result)
    })
    test('case left+right', () => {
      const result = primaryKeyOrientationPresent([
        'parking:left=yes',
        'parking:right:orientation=parallel',
      ])
      expect(false).toMatchObject(result)
    })
  })

  describe('returns false when right orientation has to to exist', () => {
    test('case right', () => {
      const result = primaryKeyOrientationPresent(['parking:right=yes'])
      expect(false).toMatchObject(result)
    })
    test('case right+right', () => {
      const result = primaryKeyOrientationPresent([
        'parking:right=yes',
        'parking:left:orientation=parallel',
      ])
      expect(false).toMatchObject(result)
    })
  })

  // Bug https://github.com/osmberlin/osm-tag-updater/issues/11
  describe('returns true when one side is no/separate', () => {
    test('case no', () => {
      const result = primaryKeyOrientationPresent([
        'parking:left:fee=no',
        'parking:left:orientation=parallel',
        'parking:left=lane',
        'parking:right:restriction=no_stopping',
        'parking:right=no',
      ])

      console.log(JSON.stringify(result))
      expect(true).toMatchObject(result)
    })

    test('case separate', () => {
      const result = primaryKeyOrientationPresent([
        'parking:left:fee=no',
        'parking:left:orientation=parallel',
        'parking:left=lane',
        'parking:right:restriction=no_stopping',
        'parking:right=separate',
      ])

      console.log(JSON.stringify(result))
      expect(true).toMatchObject(result)
    })
  })
})
