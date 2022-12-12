import clsx from 'clsx'
import React from 'react'
import { useCopyToClipboard } from '../useCopyToClipboard'

type Props = {
  text: string
  secondary?: boolean
  children: React.ReactNode
}

export const CopyButton: React.FC<Props> = ({
  text,
  secondary = false,
  children,
}) => {
  const [value, copy] = useCopyToClipboard()

  return (
    <div className="flex gap-3">
      <button
        onClick={() => copy(text)}
        className={clsx(
          {
            'inline-flex items-center rounded-full border border-violet-50 bg-violet-200 px-3 py-1.5 text-xs font-medium text-violet-700 hover:bg-violet-300 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:ring-offset-2':
              secondary,
          },
          {
            'inline-flex items-center rounded-full border border-transparent bg-violet-600 px-3 py-1.5 text-xs font-medium text-white shadow-sm hover:bg-violet-800 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:ring-offset-2':
              !secondary,
          }
        )}
      >
        {children}
      </button>
      {value && <span className="text-green-500">copied</span>}
    </div>
  )
}
