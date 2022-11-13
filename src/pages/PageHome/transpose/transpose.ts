import { transposeTags } from './transposeTags'
import { transposeTemplate } from './transposeTemplateTags.const'
import { TagsStringArray } from './typs'

export const transpose = (tags: TagsStringArray) => {
  const inputTags = tags.filter(Boolean)
  const ignoredTags = inputTags.filter((t) => !t.startsWith('parking:'))
  const candidateTags = inputTags.filter((t) => t.startsWith('parking:'))

  const transposedTags = transposeTags(transposeTemplate)

  const unrecognizedTags: TagsStringArray = []
  const newTags: TagsStringArray = []
  candidateTags.forEach((tag) => {
    const [oldKey, oldVal] = tag.split('=')
    const newTag = transposedTags[oldKey || '']
    if (!newTag) {
      unrecognizedTags.push(tag)
    } else {
      newTags.push(`${newTag}=${oldVal}`)
    }
  })

  return { ignoredTags, unrecognizedTags, newTags }
}
