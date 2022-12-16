import { TagsStringArray } from '../transpose'
import { deduplicateTags } from './deduplicateTags'

export const consolidateSides = (tags: TagsStringArray) => {
  let cleanedTags = tags

  const tagsWithoutSide = tags.map((t) =>
    t
      .replace(':left', ':{SIDE}')
      .replace(':right', ':{SIDE}')
      .replace(':both', ':{SIDE}')
  )

  // Only look at tags that exist twice
  const duplicateTagsWithoutSide = tagsWithoutSide.filter(
    (t1) => tagsWithoutSide.filter((t2) => t2 === t1).length
  )

  // Only look at on of those duplicates
  const duplicatedTagsWithoutSide = deduplicateTags(duplicateTagsWithoutSide)

  duplicatedTagsWithoutSide.forEach((tws) => {
    // If original tags have :both, remove the :left/:right
    const hasBoth = tags.includes(tws.replace(':{SIDE}', ':both'))
    if (hasBoth) {
      cleanedTags = cleanedTags
        .filter((t) => t !== tws.replace(':{SIDE}', ':left'))
        .filter((t) => t !== tws.replace(':{SIDE}', ':right'))
    }

    // If original tags have :left+right, remove them and add both
    const hasLeft = tags.includes(tws.replace(':{SIDE}', ':left'))
    const hasRight = tags.includes(tws.replace(':{SIDE}', ':right'))
    if (hasLeft && hasRight) {
      cleanedTags = cleanedTags
        .filter((t) => t !== tws.replace(':{SIDE}', ':left'))
        .filter((t) => t !== tws.replace(':{SIDE}', ':right'))
      cleanedTags.push(tws.replace(':{SIDE}', ':both'))
    }
  })

  return cleanedTags
}
