import { transposeTags } from './transposeTags'
import { transposeTemplate } from './transposeTemplateTags.const'
import { TagsStringArray, TransposeTagsObject } from './typs'

export const transpose = (tags: TagsStringArray) => {
  const inputTags = tags.filter(Boolean)
  const ignoredTags: TagsStringArray = inputTags.filter(
    (t) => !t.startsWith('parking:')
  )
  const candidateTags: TagsStringArray = inputTags.filter((t) =>
    t.startsWith('parking:')
  )

  const transposedTags = transposeTags(transposeTemplate)

  const unrecognizedTags: TagsStringArray = []
  const newTags: TransposeTagsObject = {}
  candidateTags.forEach((tag) => {
    const newTagTEMP = transposedTags[tag]
    if (!newTagTEMP) {
      unrecognizedTags.push(tag)
    } else {
      newTags[tag] = newTagTEMP
    }
  })

  return { ignoredTags, unrecognizedTags, newTags }
}
