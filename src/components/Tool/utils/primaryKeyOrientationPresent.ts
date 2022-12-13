import { TagsStringArray } from '../transpose'
import { getKey, getValue } from '../transpose/utils'

/** @returns true if :orientation key is present for the given primary key situation */
export const primaryKeyOrientationPresent = (tags: TagsStringArray) => {
  type Conclusion = 'missing' | 'present' | 'not_needed' | null
  let conclusion: Conclusion = null

  if (!tags?.length) {
    return true
  }

  // Both orientation keys have to exist
  if (tags.some((t) => getKey(t) === 'parking:both')) {
    if (tags.some((t) => getKey(t) === 'parking:both:orientation')) {
      conclusion = 'present'
    } else if (
      tags.some((t) => getKey(t) === 'parking:left:orientation') &&
      tags.some((t) => getKey(t) === 'parking:right:orientation')
    ) {
      conclusion = 'present'
    } else {
      conclusion = 'missing'
    }
  }

  // Left is needed
  if (
    tags.some(
      (t) =>
        getKey(t) === 'parking:left' &&
        !['no', 'separate'].includes(getValue(t))
    )
  ) {
    if (
      tags.some((t) => getKey(t) === 'parking:left:orientation') ||
      tags.some((t) => getKey(t) === 'parking:both:orientation')
    ) {
      conclusion = 'present'
    } else {
      conclusion = 'missing'
    }
  }

  // Right is needed
  if (
    tags.some(
      (t) =>
        getKey(t) === 'parking:right' &&
        !['no', 'separate'].includes(getValue(t))
    )
  ) {
    if (
      tags.some((t) => getKey(t) === 'parking:right:orientation') ||
      tags.some((t) => getKey(t) === 'parking:both:orientation')
    ) {
      conclusion = 'present'
    } else {
      conclusion = 'missing'
    }
  }

  // Exit check if "no" or "separate" parking is specified
  // (This needs to be the last check so it may overwrite the others.)
  if (
    tags.some((t) => t === 'parking:both=no') ||
    tags.some((t) => t === 'parking:both=separate') ||
    (tags.some((t) => t === 'parking:left=no') &&
      tags.some((t) => t === 'parking:right=no')) ||
    (tags.some((t) => t === 'parking:left=separate') &&
      tags.some((t) => t === 'parking:right=separate')) ||
    (tags.some((t) => t === 'parking:left=no') &&
      tags.some((t) => t === 'parking:right=separate')) ||
    (tags.some((t) => t === 'parking:left=separate') &&
      tags.some((t) => t === 'parking:right=no'))
  ) {
    conclusion = 'not_needed'
  }

  if (conclusion === null) {
    return false
  }
  return ['not_needed', 'present'].includes(conclusion)
}
