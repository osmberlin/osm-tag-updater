import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'
import { useOsmQuery } from './useOsmQuery'

export const PageHome: React.FC = () => {
  const osm_id = 858659630
  const { isInitialLoading, isError, data, error, refetch, isFetching } =
    useOsmQuery(osm_id)

  type TagArray = string[]

  const [newTags, setNewTags] = useState<TagArray>([])
  const [ignoredTags, setIgnoredTags] = useState<TagArray>([])
  const [notRecognizedTags, setNotRecognizedTags] = useState<TagArray>([])

  const transpose: { [name: string]: string } = {
    'parking:lane:left': 'parking:left:orientation',
    'parking:lane:right': 'parking:right:orientation',
    'parking:lane:both': 'parking:both:orientation',
  }

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const inputTagArray = event.target.value.split('\n').filter(Boolean)
    const ignoredTagArray = inputTagArray.filter(
      (t) => !t.startsWith('parking:')
    )
    setIgnoredTags(ignoredTagArray)
    const candidateTagsArray = inputTagArray.filter((t) =>
      t.startsWith('parking:')
    )

    const notRecognizedTagsArray: TagArray = []
    const newTagsArray: TagArray = []
    candidateTagsArray.forEach((tag) => {
      const [oldKey, oldVal] = tag.split('=')
      const newTag = transpose[oldKey || '']
      if (!newTag) {
        notRecognizedTagsArray.push(tag)
      } else {
        newTagsArray.push(`${newTag}=${oldVal}`)
      }
    })
    setNotRecognizedTags(notRecognizedTagsArray)
    setNewTags(newTagsArray)
  }

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

  const inputTags = data?.elements?.[0]?.tags
  const inputTagsString =
    inputTags &&
    Object.entries(inputTags).map(([key, value]) => `${key}=${value}`)

  return (
    <div className="p-10">
      <h1 className="text-xl font-thin">OSM Parking Lane Tag Updater</h1>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <h2 className="font-bold">Old tags</h2>
          <textarea
            className="h-52 w-full resize rounded border bg-gray-50 font-mono"
            onChange={handleChange}
            defaultValue={inputTagsString.join('\n')}
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
            {notRecognizedTags.map((tag) => {
              return <li key={tag}>{tag}</li>
            })}
          </ul>
        </div>
      </div>
    </div>
  )
}
