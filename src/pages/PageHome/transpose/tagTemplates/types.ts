export type TagsTemplateNewTagsObject = {
  newTags: string[]
  /** @desc: If the value of the given key should be copied to the newTag */
  keepValue?: true
  missingField?: {
    key: string
    values?: string[]
    msg: string
  }
  msg?: string
}

export type TagsTemplates = {
  [key: string]: TagsTemplateNewTagsObject
}
