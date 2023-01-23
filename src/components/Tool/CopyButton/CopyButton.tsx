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
            buttonStyleSecondary: secondary,
          },
          {
            buttonStyle: !secondary,
          }
        )}
      >
        {children}
      </button>
      {value && <span className="text-green-500">copied</span>}
    </div>
  )
}
