import { TagsStringArray } from '../transpose'
import { getKey } from '../transpose/utils'

/** @returns true some primary key is present */
export const primaryKeyParkingPresent = (tags: TagsStringArray) => {
  const lookForKeys = ['parking:left', 'parking:right', 'parking:both']
  return tags.some((tag) => lookForKeys.includes(getKey(tag)))
}
