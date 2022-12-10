export type NewTagsObject = {
  /** @desc: Specify the comparison mode. 'key' will implicitly preserve the original value. */
  compare: 'tag' | 'key' | 'regex'
  newTags: string[]
  missingField?: {
    key: string
    values?: string[]
    msg: string
  }
  msg?: string
}

export type TagsNewTagsObjects = {
  [key: string]: NewTagsObject
}
