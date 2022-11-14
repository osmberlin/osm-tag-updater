export type TagsStringArray = string[]

export type TagsObject = { [key: string]: string }

export type TransposeTagObject = {
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

export type TransposeTagsObject = {
  [key: string]: TransposeTagObject
}
