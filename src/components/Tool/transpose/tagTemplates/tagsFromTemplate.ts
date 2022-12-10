import { TagsNewTagsObjects } from './types'

const sideTemplate = '{SIDE}'
const sides = ['left', 'right', 'both']
// const hasSide = (tag: string) => {
//   return tag.includes(sideTemplate)
// }

const typeTemplate = '{TYPE}'
const types = ['parallel', 'diagonal', 'perpendicular', 'marked']
const hasType = (tag: string) => {
  return tag.includes(typeTemplate)
}

export const tagsFromTemplate = (tagsTemplate: TagsNewTagsObjects) => {
  // First run for SIDE
  const tagsWithSide: TagsNewTagsObjects = {}
  Object.entries(tagsTemplate).forEach(([oldTagTempl, newTagTempl]) => {
    const { newTags, missingField } = newTagTempl
    const missingFieldKey = missingField?.key
    sides.forEach((side) => {
      // Replace SIDE in oldKey
      const oldWithSide = oldTagTempl.replace(sideTemplate, side)
      // Replace SIDE in each of the 1-n new keys
      const newTagsWithSide = newTags.map((t) => t.replace(sideTemplate, side))
      // If given, replace SIDE in the missingField key
      const missingFieldKeyWithSide = missingFieldKey?.replace(
        sideTemplate,
        side
      )
      // Only re-add the missingField part if given
      const reAddMissingField =
        missingField?.key && missingFieldKeyWithSide
          ? {
              missingField: {
                ...missingField,
                ...{ key: missingFieldKeyWithSide },
              },
            }
          : {}
      // Lastly, store the new data
      tagsWithSide[oldWithSide] = {
        ...newTagTempl,
        ...{ newTags: newTagsWithSide },
        ...{ ...reAddMissingField },
      }
    })
  })

  // Second run for TYPE
  const tagsWithSideAndType: TagsNewTagsObjects = tagsWithSide
  Object.entries(tagsWithSideAndType).forEach(([oldTagTempl, newTagTempl]) => {
    if (hasType(oldTagTempl)) {
      delete tagsWithSide[oldTagTempl]
      types.forEach((type) => {
        const oldWithSide = oldTagTempl.replace(typeTemplate, type)
        tagsWithSideAndType[oldWithSide] = newTagTempl
      })
    }
  })

  const compareByTag: TagsNewTagsObjects = {}
  const compareByKey: TagsNewTagsObjects = {}
  const compareByRegex: TagsNewTagsObjects = {}
  Object.entries(tagsWithSideAndType).forEach(([key, value]) => {
    switch (value.compare) {
      case 'tag':
        compareByTag[key] = value
        break
      case 'key':
        compareByKey[key] = value
        break
      case 'regex':
        compareByRegex[key] = value
        break
    }
  })

  return { compareByTag, compareByKey, compareByRegex }
}
