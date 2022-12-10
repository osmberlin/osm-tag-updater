import { TagsStringArray } from '../transpose'

type Props =
  | {
      [tag: string]: string
    }
  | undefined

export const tagsObjectToStringArray = (inputTags: Props) => {
  if (!inputTags) return undefined

  return Object.entries(inputTags).map(
    ([key, value]) => `${key}=${value}`
  ) as TagsStringArray
}
