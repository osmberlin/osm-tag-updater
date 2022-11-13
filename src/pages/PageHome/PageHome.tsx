import { useEffect, useState } from 'react'
import { TagsStringArray, transpose } from './transpose'
import { useOsmQuery } from './useOsmQuery'
import { tagsObjectToStringArray } from './utils'

export const PageHome: React.FC = () => {
  const osm_id = 858659630
  const { isInitialLoading, isError, data, error, refetch, isFetching } =
    useOsmQuery(osm_id)

  const inputTags = data?.elements?.[0]?.tags
  const inputTagsString = tagsObjectToStringArray(inputTags)

  const [newTags, setNewTags] = useState<TagsStringArray>([])
  const [ignoredTags, setIgnoredTags] = useState<TagsStringArray>([])
  const [unrecognizedTags, setUnrecognizedTags] = useState<TagsStringArray>([])

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
      <h1 className="text-xl font-thin">OSM Parking Lane Tag Updater</h1>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <h2 className="font-bold">Old tags</h2>
          <textarea
            className="h-52 w-full resize rounded border bg-gray-50 font-mono"
            onChange={handleChange}
            defaultValue={inputTagsString?.join('\n')}
          />
          <h3 className="font-semibold">Recognized tags:</h3>
          <ul>
            {ignoredTags.map((tag) => {
              return <li key={tag}>{tag}</li>
            })}
          </ul>
          <button
            onClick={() => refetch()}
            className="rounded-sm border p-0.5 hover:bg-blue-50"
          >
            Reload data
          </button>
        </div>
        <div>
          <h2 className="font-bold">New tags</h2>
          <textarea
            className="h-52 w-full resize rounded border bg-gray-50 font-mono"
            readOnly
            value={newTags.join('\n')}
          />
          <h3 className="font-semibold">Tags that we could not transpose:</h3>
          <ul>
            {unrecognizedTags.map((tag) => {
              return <li key={tag}>{tag}</li>
            })}
          </ul>
        </div>
      </div>
    </div>
  )
}
