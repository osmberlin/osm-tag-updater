import { tagsFromTemplate } from './tagTemplates/tagsFromTemplate'
import { tagsTemplates } from './tagTemplates/tagsTemplates.const'
import { TagsTemplates } from './tagTemplates/types'
import { TagsStringArray } from './types'

export const transpose = (tags: TagsStringArray) => {
  const inputTags = tags.filter(Boolean)
  const ignoredTags: TagsStringArray = inputTags.filter(
    (t) => !t.startsWith('parking:')
  )
  const candidateTags: TagsStringArray = inputTags.filter((t) =>
    t.startsWith('parking:')
  )

  const transposedTags = tagsFromTemplate(tagsTemplates)

  const unrecognizedTags: TagsStringArray = []
  const newTags: TagsTemplates = {}
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
