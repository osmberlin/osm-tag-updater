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
  const [newTagsManualCandidates, setNewTagsManualCandidates] =
    useState<TagsStringArray>([])
  const [newTagObjects, setNewTagObjects] = useState<TagsNewTagsObjects>({})
  const [outputTags, setOutputTags] = useState<string[]>([])
  const ignoredTagsEdgeCases = ignoredTags.filter((t) => t.includes('parking'))

  const handleUpdate = (tags: TagsStringArray) => {
    const { ignoredTags, newTagsManualCandidates, newTagObjects } =
      transpose(tags)
    console.log({ ignoredTags, newTagsManualCandidates, newTagObjects })

    setIgnoredTags(ignoredTags)
    setNewTagsManualCandidates(newTagsManualCandidates)
    setNewTagObjects(newTagObjects)
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
    <>
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
                    ...newTagsManualCandidates,
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
        <Table newTagObjects={newTagObjects} setOutputTags={setOutputTags} />

        <div className="mt-5 grid grid-cols-2 gap-4">
          <div>
            <h3 className="font-semibold">
              Tags that could not be transposed automatically – you need to
              check them manually:
            </h3>
            <ul className="text-sm">
              {newTagsManualCandidates.map((tag) => {
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
    </>
  )
}
