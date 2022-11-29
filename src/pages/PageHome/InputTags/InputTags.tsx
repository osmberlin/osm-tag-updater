import React from 'react'
import { useForm } from 'react-hook-form'

type Props = {
  inputTags: string[] | undefined
  onSubmit: (tags: string[]) => void
}

type FormData = {
  tags: string
}

export const InputTags: React.FC<Props> = ({ inputTags, onSubmit }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>()

  const innerOnSubmit = handleSubmit((data) => {
    onSubmit(data.tags.split('\n'))
  })

  return (
    <>
      <form className="" onSubmit={innerOnSubmit}>
        <textarea
          {...register('tags', { required: true })}
          className="h-40 w-full resize rounded border bg-gray-50 font-mono text-sm"
          defaultValue={inputTags?.join('\n')}
        />
        {errors.tags && (
          <span className="inline-flex h-5 items-center bg-red-100 px-1 text-xs text-red-700">
            Cannot be blank
          </span>
        )}
        <button
          type="submit"
          className="flex h-5 items-center rounded border bg-gray-50 px-0.5 text-xs font-semibold shadow hover:bg-blue-50"
        >
          Update
        </button>
      </form>
    </>
  )
}
