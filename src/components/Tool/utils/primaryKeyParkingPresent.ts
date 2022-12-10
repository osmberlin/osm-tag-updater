import { TagsStringArray } from '../transpose'
import { getKey } from '../transpose/utils'

/** @returns true some primary key is present (or no tags are present at all) */
export const primaryKeyParkingPresent = (tags: TagsStringArray) => {
  if (!tags?.length) {
    return true
  }

  const lookForKeys = ['parking:left', 'parking:right', 'parking:both']
  return tags.some((tag) => lookForKeys.includes(getKey(tag)))
}
