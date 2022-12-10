import { TagsStringArray } from '../transpose'
import { getKey } from '../transpose/utils'

export const checkSideBothInconsistencies = (tags: TagsStringArray) => {
  // For each key that has ':both' in it, we create an array of [key, otherKey]
  // where otherKey is the ':left', ':right' version.
  const bothKeyAndCheckKey: string[][] = []
  tags.forEach((tag) => {
    const key = getKey(tag)
    if (key.includes(':both')) {
      bothKeyAndCheckKey.push([key, key.replaceAll(':both', ':left')])
      bothKeyAndCheckKey.push([key, key.replaceAll(':both', ':right')])
    }
  })

  const issueKeys: string[][] = []
  tags.forEach((tag) => {
    bothKeyAndCheckKey.forEach(([bothKey, otherKey]) => {
      const tagKey = getKey(tag)
      if (tagKey === otherKey) {
        issueKeys.push([bothKey, otherKey])
      }
    })
  })

  return issueKeys
}
