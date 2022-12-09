import React from 'react'
import { useForm } from 'react-hook-form'

type Props = {
  tags: string[] | undefined
  onSubmit: (tags: string[]) => void
}

type FormData = {
  tags: string
}

export const InputTags: React.FC<Props> = ({ tags, onSubmit }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>()

  const innerOnSubmit = handleSubmit((data: FormData) => {
    onSubmit(data.tags.split('\n'))
  })

  // Enable cmd+enter
  // Thanks for the help at https://github.com/react-hook-form/react-hook-form/discussions/9485
  const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.metaKey && event.key === 'Enter') {
      innerOnSubmit()
    }
  }

  return (
    <form onSubmit={innerOnSubmit}>
      <textarea
        {...register('tags')}
        onKeyDown={handleKeyDown}
        className="block h-40 w-full resize rounded-md border-gray-300 font-mono text-sm shadow-sm focus:border-violet-500 focus:ring-violet-500 sm:text-sm"
        defaultValue={tags?.join('\n')}
        required
      />
      {errors.tags && (
        <span className="inline-flex h-5 items-center bg-red-100 px-1 text-xs text-red-700">
          Cannot be blank
        </span>
      )}
      <div className="mt-2 flex items-center justify-end gap-3">
        <span className="text-xs text-gray-500">
          Tip: Use <kbd>cmd</kbd>+<kbd>enter</kbd> to submit the form.
        </span>
        <button
          type="submit"
          className="flex h-5 items-center rounded border bg-gray-50 px-0.5 text-xs font-semibold shadow hover:bg-blue-50"
        >
          Update
        </button>
      </div>
    </form>
  )
}
