import { TagsStringArray } from '../transpose'

// Make array unique `Array.from(new Set[/* non-unique array */]))` https://stackoverflow.com/a/9229821/729221
export const deduplicateTags = (tags: TagsStringArray) => {
  return Array.from(new Set([...tags]))
}
