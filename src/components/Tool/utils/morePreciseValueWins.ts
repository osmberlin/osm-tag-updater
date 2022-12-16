import { TagsStringArray } from '../transpose'
import { getKey, getValue } from '../transpose/utils'

export const morePreciseValueWins = (tags: TagsStringArray) => {
  let cleanedTags = tags
  const keys = tags.map((t) => getKey(t))

  const sameKeyAndGenericValueTags = tags.filter((tag) => {
    const keyMultipleTimes = keys.filter((k) => k === getKey(tag)).length > 1
    const keyGeneric = ['yes', 'no'].includes(getValue(tag))
    return keyMultipleTimes && keyGeneric
  })

  tags.forEach((tag) => {
    if (sameKeyAndGenericValueTags.includes(tag)) {
      cleanedTags = cleanedTags.filter((t) => t !== tag)
    }
  })

  return cleanedTags
}
