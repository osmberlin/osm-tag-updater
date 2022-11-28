import { useEffect, useState } from 'react'
import { InputForm } from './InputForm'
import { TagsStringArray, transpose, TransposeTagsObject } from './transpose'
import { useOsmQuery } from './useOsmQuery'
import { tagsObjectToStringArray } from './utils'

export const PageHome: React.FC = () => {
  const [osmWayId, setOsmWayId] = useState(858659630)
  const { isInitialLoading, isError, data, error, isFetching } =
    useOsmQuery(osmWayId)

  const inputTags = data?.elements?.[0]?.tags
  const inputTagsString = tagsObjectToStringArray(inputTags)

  const [ignoredTags, setIgnoredTags] = useState<TagsStringArray>([])
  const [unrecognizedTags, setUnrecognizedTags] = useState<TagsStringArray>([])
  const [newTags, setNewTags] = useState<TransposeTagsObject>({})
  const ignoredTagsEdgeCases = ignoredTags.filter((t) => t.includes('parking'))

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const tags = event.target.value.split('\n').filter(Boolean)
    handleUpdate(tags)
  }

  const handleUpdate = (tags: TagsStringArray) => {
    const { ignoredTags, unrecognizedTags, newTags } = transpose(tags)
    console.log({ ignoredTags, unrecognizedTags, newTags })

    setIgnoredTags(ignoredTags)
    setUnrecognizedTags(unrecognizedTags)
    setNewTags(newTags)
  }

  useEffect(() => {
    inputTagsString && handleUpdate(inputTagsString)
  }, [data])

  if (!data) {
    if (isError) {
      // @ts-ignore need to check this in the library or github issues
      return <span>Error: {error.message}</span>
    }
    if (isInitialLoading) {
      return <span>Loading…</span>
    }
    return <span>Not ready …</span>
  }
  if (isFetching) {
    return <span>Fetching…</span>
  }

  return (
    <div className="p-10">
      <h1 className="mb-5 text-3xl font-thin">OSM Parking Lane Tag Updater</h1>
      <section>
        <div className="mt-5 grid grid-cols-2 gap-4">
          <div>
            <div className="mb-2 flex justify-between">
              <h2 className="font-bold">Input</h2>
              <InputForm currentWayId={osmWayId} onSubmit={setOsmWayId} />
            </div>
            <textarea
              className="h-40 w-full resize rounded border bg-gray-50 font-mono text-sm"
              onChange={handleChange}
              defaultValue={inputTagsString?.join('\n')}
            />
          </div>
          <div>
            <h2 className="mb-2 font-bold">Output</h2>
            <textarea
              className="h-40 w-full resize rounded border bg-gray-50 font-mono text-sm"
              defaultValue={'todo'}
            />
            {!!ignoredTagsEdgeCases.length && (
              <div className="mt-2 bg-orange-100 p-3">
                Please review the following tags. They include the term{' '}
                <code>parking</code> which is a strong indication that they
                should be handled manually:{' '}
                <code>{ignoredTagsEdgeCases.join(', ')}</code>
              </div>
            )}
          </div>
        </div>
      </section>

      <section className="mt-5">
        <h2 className="mb-2 font-bold">New Tags</h2>
        <table className="w-full">
          <thead className="border-b-4">
            <tr>
              <th className="text-left font-semibold">Old Tags:</th>
              <th className="text-left font-semibold">New Tags:</th>
            </tr>
          </thead>
          <tbody>
            {Object.entries(newTags).map(([oldTag, newTagObject]) => {
              return (
                <tr key={oldTag} className="border-b hover:bg-purple-50">
                  <th className="w-1/3 py-1 text-left align-top font-semibold">
                    {oldTag}
                  </th>
                  <td className="space-y-1 py-1 align-top">
                    {newTagObject.newTags.map((newTag) => {
                      return (
                        <input
                          key={newTag}
                          type="text"
                          defaultValue={newTag}
                          className="block w-full rounded-sm border bg-yellow-50 px-1 py-0.5"
                        />
                      )
                    })}
                    <div className="text-xs text-gray-300 hover:text-gray-600">
                      {JSON.stringify(newTagObject)}
                    </div>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
        <div className="mt-5 grid grid-cols-2 gap-4">
          <div>
            <h3 className="font-semibold">Tags that we could not transpose:</h3>
            <ul className="text-sm">
              {unrecognizedTags.map((tag) => {
                return <li key={tag}>{tag}</li>
              })}
            </ul>
          </div>
          <div>
            <h3 className="font-semibold">Tags that we ignored:</h3>
            <ul className="text-sm">
              {ignoredTags.map((tag) => {
                return <li key={tag}>{tag}</li>
              })}
            </ul>
          </div>
        </div>
      </section>
    </div>
  )
}
