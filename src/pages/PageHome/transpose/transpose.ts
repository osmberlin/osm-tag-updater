import { tagsFromTemplate } from './tagTemplates/tagsFromTemplate'
import { tagsTemplates } from './tagTemplates/tagsTemplates.const'
import { NewTagsObject, TagsNewTagsObjects } from './tagTemplates/types'
import { TagsStringArray } from './types'
import { count, getKey, getValue, splitTag } from './utils'

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

  const createTagObject = (tag: string, msg: string) => {
    const newTag: NewTagsObject = {
      newTags: [`fixme=${tag}`],
      compare: 'tag', // Not used, just for TS/consistency
      msg,
    }
    return newTag
  }

  const newTagsManualCandidates: TagsNewTagsObjects = {}
  const newTagObjects: TagsNewTagsObjects = {}
  candidateTags.forEach((tag) => {
    // General checks – exit forEach if true
    if (count(tag, '@') > 1) {
      newTagsManualCandidates[tag] = createTagObject(
        tag,
        'This tag contains more than one @-sign. Please update it manually.'
      )
      return
    }
    const [checkKey, checkValue] = splitTag(tag)
    if (count(tag, '=' || !checkKey || !checkValue) !== 1) {
      newTagsManualCandidates[tag] = createTagObject(
        tag,
        'This has has to many or to litte =-signs. Please update it manually.'
      )
      return
    }

    // Compare-Type 'tag' – exit forEach if true
    const newTagObjectByTag = compareByTag[tag]
    if (newTagObjectByTag) {
      newTagObjects[tag] = newTagObjectByTag
      return
    }

    // Compare-Type 'key' – exit forEach if true
    const newTagObjectByKey = compareByKey[getKey(tag)]
    if (newTagObjectByKey) {
      const value = getValue(tag)
      newTagObjects[tag] = {
        ...newTagObjectByKey,
        newTags: [`${newTagObjectByKey.newTags[0]}=${value}`],
      }
      return
    }

    // Compare-Type 'regex' – exit forEach if true
    let returnBecauseRegexMatched = false
    Object.entries(compareByRegex).forEach(([oldKey, newKeyObject]) => {
      const regex = new RegExp(oldKey.replace('{ANYTHING}', '(.*)'))
      const match = tag.match(regex)
      if (match) {
        const value = match[1]
        newTagObjects[tag] = {
          ...newKeyObject,
          newTags: [
            ...newKeyObject.newTags.map((t) => t.replace('{ANYTHING}', value)),
          ],
        }
        returnBecauseRegexMatched = true
      }
    })
    if (returnBecauseRegexMatched) {
      return
    }

    // Everythign else are manual candidates
    newTagsManualCandidates[tag] = createTagObject(
      tag,
      'The tool was not able to update this tag. Please update it manually. Some tags will split in multiple new tags. Please use the output-textarea to change those.'
    )
  })

  return { ignoredTags, newTagsManualCandidates, newTagObjects }
}
