export const getKey = (tag: string) => {
  const [key, _] = splitTag(tag)
  return key
}

export const getValue = (tag: string) => {
  const [_, value] = splitTag(tag)
  return value
}

export const splitTag = (tag: string) => {
  const [key, value] = tag.split('=')
  return [key, value]
}
