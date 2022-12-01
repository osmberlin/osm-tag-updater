import { tagsFromTemplate } from './tagTemplates/tagsFromTemplate'
import { tagsTemplates } from './tagTemplates/tagsTemplates.const'
import { TagsNewTagsObjects } from './tagTemplates/types'
import { TagsStringArray } from './types'
import { count, getKey, getValue } from './utils'

export const transpose = (tags: TagsStringArray) => {
  const cleanInputTags = tags
    .filter(Boolean)
    .map((t) =>
      t
        .split('=')
        .map((p) => p.trim())
        .join('=')
    ) // trim spaces, but also around the "="
    .map((t) => t.replaceAll('$side', 'left')) // those changes are just for easier testing
    .map((t) => t.replaceAll('{SIDE}', 'left'))
    .map((t) => t.replaceAll('$type', 'parallel'))
    .map((t) => t.replaceAll('{TYPE}', 'parallel'))

  const ignoredTags: TagsStringArray = cleanInputTags.filter(
    (t) => !t.startsWith('parking:')
  )
  const candidateTags: TagsStringArray = cleanInputTags.filter((t) =>
    t.startsWith('parking:')
  )

  const { compareByTag, compareByKey, compareByRegex } =
    tagsFromTemplate(tagsTemplates)

  const newTagsManualCandidates: TagsStringArray = []
  const newTagObjects: TagsNewTagsObjects = {}
  candidateTags.forEach((tag) => {
    if (count(tag, '@') > 1 || count(tag, '=') !== 1) {
      console.warn(
        'Found more than one @-sign in this tag. Those cases need to be handled manually.'
      )
      newTagsManualCandidates.push(tag)
      return
    }

    const newTagObjectByTag = compareByTag[tag]
    if (newTagObjectByTag) {
      newTagObjects[tag] = newTagObjectByTag
      return
    }

    const newTagObjectByKey = compareByKey[getKey(tag)]
    if (newTagObjectByKey) {
      const value = getValue(tag)
      newTagObjects[tag] = {
        ...newTagObjectByKey,
        newTags: [`${newTagObjectByKey.newTags[0]}=${value}`],
      }
      return
    }

    Object.entries(compareByRegex).forEach(([oldKey, newKeyObject]) => {
      const regex = new RegExp(oldKey.replace('{ANYTHING}', '(.*)'))
      const match = tag.match(regex)
      if (match) {
        const value = match[1]
        console.log('x', { match, value, newKeyObject })
        newTagObjects[tag] = {
          ...newKeyObject,
          newTags: [
            ...newKeyObject.newTags.map((t) => t.replace('{ANYTHING}', value)),
          ],
        }
      }
    })

    newTagsManualCandidates.push(tag)
  })

  return { ignoredTags, newTagsManualCandidates, newTagObjects }
}
