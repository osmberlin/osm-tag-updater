import React from 'react'
import { useCopyToClipboard } from '../useCopyToClipboard'

type Props = { text: string }

export const CopyButton: React.FC<Props> = ({ text }) => {
  const [value, copy] = useCopyToClipboard()

  return (
    <div className="flex gap-3">
      <button
        onClick={() => copy(text)}
        className="text-md flex items-center rounded border bg-pink-100 px-1 font-semibold shadow hover:bg-blue-50"
      >
        Copy
      </button>
      {value && <span className="text-green-500">copied</span>}
    </div>
  )
}
