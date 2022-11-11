import { useEffect, useState } from 'react'
import './index.css'

type TagArray = string[]

function App() {
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

  return (
    <div className="p-10">
      <h1 className="text-xl font-thin">OSM Parking Lane Tag Updater</h1>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <h2 className="font-bold">Old tags</h2>
          <textarea
            className="h-52 w-full resize rounded border bg-gray-50 font-mono"
            onChange={handleChange}
            defaultValue="parking:lane"
          />
          <h3 className="font-semibold">Recognized tags:</h3>
          <ul>
            {ignoredTags.map((tag) => {
              return <li key={tag}>{tag}</li>
            })}
          </ul>
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

export default App
