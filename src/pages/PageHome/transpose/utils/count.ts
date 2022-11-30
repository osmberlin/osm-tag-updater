// https://stackoverflow.com/a/4009768/729221
export const count = (input: string, searchTerm: string) => {
  const regex = new RegExp(searchTerm, 'g')
  return (input.match(regex) || []).length
}
