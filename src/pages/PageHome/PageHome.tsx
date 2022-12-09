import { ExternalLink } from '@components/Link'
import { useEffect, useState } from 'react'
import { CopyButton } from './CopyButton'
import { InputOsmId } from './InputOsmId'
import { InputTags } from './InputTags'
import { Table } from './Table'
import { TagsNewTagsObjects, TagsStringArray, transpose } from './transpose'
import { useOsmQuery } from './useOsmQuery'
import {
  checkPrimaryKeyOrientation,
  checkPrimaryKeyParking,
  tagsObjectToStringArray,
} from './utils'

export const PageHome: React.FC = () => {
  const [osmWayId, setOsmWayId] = useState(858659630)
  const { isInitialLoading, isError, data, error, isFetching } =
    useOsmQuery(osmWayId)

  const inputTags = data?.elements?.[0]?.tags
  const inputTagsString = tagsObjectToStringArray(inputTags)

  const [ignoredTags, setIgnoredTags] = useState<TagsStringArray>([])
  const [newTagObjects, setNewTagObjects] = useState<TagsNewTagsObjects>({})
  const [outputTags, setOutputTags] = useState<string[]>([])
  const ignoredTagsEdgeCases = ignoredTags.filter((t) => t.includes('parking'))

  const handleUpdate = (tags: TagsStringArray) => {
    const { ignoredTags, newTagsManualCandidates, newTagObjects } =
      transpose(tags)

    setIgnoredTags(ignoredTags)
    // Both the tags that we where able to update as well as those that need to be updated manually are put into the
    setNewTagObjects({ ...newTagObjects, ...newTagsManualCandidates })
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
              <InputOsmId currentWayId={osmWayId} onSubmit={setOsmWayId} />
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
                <CopyButton text={[...outputTags, ...ignoredTags].join('\n')}>
                  Copy All Tags
                </CopyButton>
              </div>
            </div>
            <textarea
              className="block h-40 w-full resize rounded-md border-gray-300 font-mono text-sm shadow-sm focus:border-violet-500 focus:ring-violet-500 sm:text-sm"
              value={outputTags.join('\n')}
              readOnly
            />
            {!!ignoredTagsEdgeCases.length && (
              <div className="prose mt-2 rounded bg-orange-200 p-3 leading-tight">
                Please review the following tags. They include the term{' '}
                <code>parking</code> which is a strong indication that they
                should be handled manually:{' '}
                <code>{ignoredTagsEdgeCases.join(', ')}</code>
              </div>
            )}
            {!checkPrimaryKeyParking(outputTags) && (
              <div className="prose mt-2 rounded bg-orange-200 p-3 leading-tight">
                The primary key <code>parking:$side=*</code> is missing.{' '}
                <ExternalLink
                  href="https://wiki.openstreetmap.org/wiki/Street_parking#Quick_guide"
                  blank
                >
                  Wiki-Quickguide…
                </ExternalLink>
              </div>
            )}
            {!checkPrimaryKeyOrientation(outputTags) && (
              <div className="prose mt-2 rounded bg-orange-200 p-3 leading-tight">
                The primary orientation key{' '}
                <code>parking:$side:orientation=*</code> is missing.{' '}
                <ExternalLink
                  href="https://wiki.openstreetmap.org/wiki/Street_parking#Quick_guide"
                  blank
                >
                  Wiki-Quickguide…
                </ExternalLink>
              </div>
            )}
          </div>
        </div>
      </section>

      <section className="mt-5">
        <Table newTagObjects={newTagObjects} setOutputTags={setOutputTags} />

        <div className="mt-5 grid grid-cols-2 gap-4">
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
