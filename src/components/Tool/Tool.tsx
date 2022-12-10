import { ExternalLink } from '@components/Link'
import { useState } from 'react'
import { CopyButton } from '../../components/Tool/CopyButton'
import { InputTags } from '../../components/Tool/InputTags'
import { Table } from '../../components/Tool/Table'
import {
  TagsNewTagsObjects,
  TagsStringArray,
  transpose,
} from '../../components/Tool/transpose'
import {
  primaryKeyOrientationPresent,
  primaryKeyParkingPresent,
  tagsObjectToStringArray,
} from '../../components/Tool/utils'
import { checkSideBothInconsistencies } from '../../components/Tool/utils/checkSideBothInconsistencies'
import { deduplicateTags } from '../../components/Tool/utils/deduplicateTags'
import { Way } from '../queryWay'

type Props = { rawTags?: Way }

export const Tool: React.FC<Props> = ({ rawTags }) => {
  console.log({ rawTags })
  const inputTags = rawTags?.elements?.[0]?.tags
  const inputTagsString = tagsObjectToStringArray(inputTags)

  const [ignoredTags, setIgnoredTags] = useState<TagsStringArray>([])
  const [newTagObjects, setNewTagObjects] = useState<TagsNewTagsObjects>({})
  const [outputTags, setOutputTags] = useState<string[]>([])
  const ignoredTagsEdgeCases = ignoredTags.filter((t) => t.includes('parking'))

  const handleSetOutputTags = (tags: TagsStringArray) => {
    tags = tags.filter(Boolean)
    tags = deduplicateTags(tags)
    tags = tags.sort((t1, t2) => t1.localeCompare(t2))
    setOutputTags(tags)
  }

  const handleUpdate = (tags: TagsStringArray) => {
    const { ignoredTags, newTagsManualCandidates, newTagObjects } =
      transpose(tags)

    setIgnoredTags(ignoredTags)
    // Both the tags that we where able to update as well as those that need to be updated manually are put into the
    setNewTagObjects({ ...newTagObjects, ...newTagsManualCandidates })
  }

  // if (inputTagsString) {
  //   handleUpdate(inputTagsString)
  // }

  return (
    <>
      <section>
        <div className="mt-5 grid grid-cols-2 gap-4">
          <div>
            <div className="mb-2 flex justify-between">
              <h2 className="font-bold">Input</h2>
            </div>
            <InputTags tags={inputTagsString} onSubmit={handleUpdate} />
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
            {outputTags.some((tag) => tag.startsWith('fixme=')) && (
              <div className="prose mt-2 rounded bg-orange-200 px-3 py-2 leading-tight">
                Please fix the <code>fixme=*</code> tags. Details are described
                in the table below.
              </div>
            )}
            {Boolean(ignoredTagsEdgeCases.length) && (
              <div className="prose mt-2 rounded bg-orange-200 px-3 py-2 leading-tight">
                Please review the following tags. They include the term{' '}
                <code>parking</code> which is a strong indication that they
                should be handled manually:{' '}
                <code>{ignoredTagsEdgeCases.join(', ')}</code>
              </div>
            )}
            {!primaryKeyParkingPresent(outputTags) && (
              <div className="prose mt-2 rounded bg-orange-200 px-3 py-2 leading-tight">
                The primary key <code>parking:$side=*</code> is missing.{' '}
                <ExternalLink
                  href="https://wiki.openstreetmap.org/wiki/Street_parking#Quick_guide"
                  blank
                >
                  Wiki-Quickguide…
                </ExternalLink>
              </div>
            )}
            {!primaryKeyOrientationPresent(outputTags) && (
              <div className="prose mt-2 rounded bg-orange-200 px-3 py-2 leading-tight">
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
            {Boolean(checkSideBothInconsistencies(outputTags)?.length) && (
              <div className="prose mt-2 rounded bg-orange-200 px-3 py-2 leading-tight">
                The following keys are inconsistent. Either change the{' '}
                <code>:both</code> to <code>:left</code> <em>or</em>{' '}
                <code>:right</code> <em>or</em> remove the sides so only{' '}
                <code>:both</code> preserves.
                <ul>
                  {checkSideBothInconsistencies(outputTags).map(
                    ([bothKey, otherKey]) => (
                      <li key={bothKey}>
                        <code>{bothKey}</code> and <code>{otherKey}</code>
                      </li>
                    )
                  )}
                </ul>
              </div>
            )}
          </div>
        </div>
      </section>

      <section className="mt-5">
        <Table
          newTagObjects={newTagObjects}
          setOutputTags={handleSetOutputTags}
        />

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