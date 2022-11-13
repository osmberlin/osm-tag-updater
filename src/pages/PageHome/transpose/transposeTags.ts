import { TagsObject } from './typs'

const sideTemplate = '{SIDE}'
const sides = ['left', 'right', 'both']
// const hasSide = (tag: string) => {
//   return tag.includes(sideTemplate)
// }

const typeTemplate = '{TYPE}'
const types = ['parallel', 'diagonal', 'perpendicular']
const hasType = (tag: string) => {
  return tag.includes(typeTemplate)
}

export const transposeTags = (tagsTemplate: TagsObject) => {
  // First run for SIDE
  const tagsWithSide: TagsObject = {}
  Object.entries(tagsTemplate).forEach(([oldTagTempl, newTagTempl]) => {
    sides.forEach((side) => {
      const oldWithSide = oldTagTempl.replace(sideTemplate, side)
      const newWithSide = newTagTempl.replace(sideTemplate, side)
      tagsWithSide[oldWithSide] = newWithSide
    })
  })

  // Second run for TYPE
  const tagsWithSideAndType: TagsObject = tagsWithSide
  Object.entries(tagsWithSideAndType).forEach(([oldTagTempl, newTagTempl]) => {
    if (hasType(oldTagTempl)) {
      delete tagsWithSide[oldTagTempl]
      types.forEach((type) => {
        const oldWithSide = oldTagTempl.replace(typeTemplate, type)
        const newWithSide = newTagTempl.replace(typeTemplate, type)
        tagsWithSideAndType[oldWithSide] = newWithSide
      })
    }
  })

  return tagsWithSideAndType
}
