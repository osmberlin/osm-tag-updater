import React from 'react'

type Props = { number: number }

export const NumberIcon: React.FC<Props> = ({ number }) => {
  return (
    <div className="inline-flex items-center rounded-full border border-transparent bg-fuchsia-500 p-2 text-white shadow-sm">
      <span className="inline-flex h-4 w-4 items-center justify-center text-lg text-fuchsia-50">
        {number}
      </span>
    </div>
  )
}
