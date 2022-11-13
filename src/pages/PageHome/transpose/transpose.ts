export type TagsStringArray = string[]

export const transpose = (tags: TagsStringArray) => {
  const inputTags = tags.filter(Boolean)
  const ignoredTags = inputTags.filter((t) => !t.startsWith('parking:'))
  const candidateTags = inputTags.filter((t) => t.startsWith('parking:'))

  const transpose: { [name: string]: string } = {
    'parking:lane:left': 'parking:left:orientation',
    'parking:lane:right': 'parking:right:orientation',
    'parking:lane:both': 'parking:both:orientation',
  }

  const unrecognizedTags: TagsStringArray = []
  const newTags: TagsStringArray = []
  candidateTags.forEach((tag) => {
    const [oldKey, oldVal] = tag.split('=')
    const newTag = transpose[oldKey || '']
    if (!newTag) {
      unrecognizedTags.push(tag)
    } else {
      newTags.push(`${newTag}=${oldVal}`)
    }
  })

  return { ignoredTags, unrecognizedTags, newTags }
}
