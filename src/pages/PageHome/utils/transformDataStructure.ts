import { TagsStringArray } from '../transpose'

export const tagsObjectToStringArray = (inputTags: {
  [tag: string]: string
}) => {
  if (!inputTags) return undefined
  return Object.entries(inputTags).map(
    ([key, value]) => `${key}=${value}`
  ) as TagsStringArray
}
