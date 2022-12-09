import { TagsStringArray } from '../transpose'
import { getKey } from '../transpose/utils'

export const checkPrimaryKeyParking = (tags: TagsStringArray) => {
  const lookForKeys = ['parking:left', 'parking:right', 'parking:both']
  return tags.some((tag) => lookForKeys.includes(getKey(tag)))
}

export const checkPrimaryKeyOrientation = (tags: TagsStringArray) => {
  const lookForKeys = [
    'parking:left:orientation',
    'parking:right:orientation',
    'parking:both:orientation',
  ]
  return tags.some((tag) => lookForKeys.includes(getKey(tag)))
}
