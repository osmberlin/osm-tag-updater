import { tagsFromTemplate } from './tagTemplates/tagsFromTemplate'
import { tagsTemplates } from './tagTemplates/tagsTemplates.const'
import { TagsNewTagsObjects } from './tagTemplates/types'
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
  const newTags: TagsNewTagsObjects = {}
  candidateTags.forEach((tag) => {
    if (!transposedTags[tag]) {
      unrecognizedTags.push(tag)
    } else {
      newTags[tag] = transposedTags[tag]
    }
  })

  return { ignoredTags, unrecognizedTags, newTags }
}
