import { transposeTags } from './transposeTags'
import { transposeTemplate } from './transposeTemplateTags.const'
import { TagsStringArray, TransposeTagObject } from './typs'

export const transpose = (tags: TagsStringArray) => {
  const inputTags = tags.filter(Boolean)
  const ignoredTags = inputTags.filter((t) => !t.startsWith('parking:'))
  const candidateTags = inputTags.filter((t) => t.startsWith('parking:'))

  const transposedTags = transposeTags(transposeTemplate)

  const unrecognizedTags: TagsStringArray = []
  const newTags: TransposeTagObject[] = []
  candidateTags.forEach((tag) => {
    const newTagTEMP = transposedTags[tag]
    if (!newTagTEMP) {
      unrecognizedTags.push(tag)
    } else {
      newTags.push(newTagTEMP)
    }
  })

  return { ignoredTags, unrecognizedTags, newTags }
}
