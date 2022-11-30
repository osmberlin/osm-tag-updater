import { useEffect, useState } from 'react'
import { CopyButton } from './CopyButton'
import { InputForm } from './InputForm'
import { InputTags } from './InputTags'
import { Table } from './Table'
import { transpose, TagsNewTagsObjects, TagsStringArray } from './transpose'
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
  const [newTags, setNewTags] = useState<TagsNewTagsObjects>({})
  const [outputTags, setOutputTags] = useState<string[]>([])
  const ignoredTagsEdgeCases = ignoredTags.filter((t) => t.includes('parking'))

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
      <h1 className="mb-5 text-3xl font-thin">
        OSM Parking Lane Tag Updater{' '}
        <small className="text-xs">{APP_VERSION}</small>
      </h1>
      <section>
        <div className="mt-5 grid grid-cols-2 gap-4">
          <div>
            <div className="mb-2 flex justify-between">
              <h2 className="font-bold">Input</h2>
              <InputForm currentWayId={osmWayId} onSubmit={setOsmWayId} />
            </div>
            <InputTags inputTags={inputTagsString} onSubmit={handleUpdate} />
          </div>
          <div>
            <div className="mb-2 flex justify-between">
              <h2 className="font-bold">Output</h2>
              <div className="flex gap-3">
                <CopyButton text={outputTags.join('\n')}>
                  Copy Parking Tags
                </CopyButton>
                <CopyButton
                  text={[
                    ...outputTags,
                    ...ignoredTags,
                    ...unrecognizedTags,
                  ].join('\n')}
                >
                  Copy All Tags
                </CopyButton>
              </div>
            </div>
            <textarea
              className="h-40 w-full resize rounded border bg-gray-50 font-mono text-sm"
              value={outputTags.join('\n')}
              readOnly
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
        <Table newTags={newTags} setOutputTags={setOutputTags} />

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
