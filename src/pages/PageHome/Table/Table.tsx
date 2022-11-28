import { clsx } from 'clsx'
import React, { useEffect } from 'react'
import { useFieldArray, useForm } from 'react-hook-form'
import { TransposeTagsObject } from '../transpose'

type Props = {
  newTags: TransposeTagsObject
  setOutputTags: (tags: string[]) => void
}

type FormValues = {
  tags: {
    oldTag: string
    newTag: string
  }[]
}

export const Table: React.FC<Props> = ({ newTags, setOutputTags }) => {
  // Docs https://react-hook-form.com/api/usefieldarray/
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      tags: [],
    },
    mode: 'onChange',
  })
  const { fields, append, remove } = useFieldArray<FormValues>({
    name: 'tags',
    control,
  })

  const onChange = handleSubmit((data: FormValues) => {
    console.log(data)
    setOutputTags(data.tags.map((d) => d.newTag))
  })

  // TODO: Fix reset when wayId changes
  useEffect(() => remove(), [])

  // Populate form
  useEffect(() => {
    const initialOutputTags: string[] = []
    Object.entries(newTags).map(([oldTag, newTagObject]) => {
      newTagObject.newTags.map((newTag) => {
        append({ oldTag, newTag })
        initialOutputTags.push(newTag)
      })
    })
    setOutputTags(initialOutputTags)
  }, [newTags])

  let oldTagStore = '' // Styling

  return (
    <>
      <h2 className="mb-2 font-bold">New Tags</h2>
      <form onChange={onChange}>
        <table className="w-full">
          <thead className="border-b-4">
            <tr>
              <th className="text-left font-semibold">Old Tags:</th>
              <th className="text-left font-semibold">New Tags:</th>
            </tr>
          </thead>
          <tbody>
            {fields.map((field, index) => {
              const secondOldTag = oldTagStore === field.oldTag // Styling
              oldTagStore = field.oldTag

              return (
                <tr key={field.id} className="border-b hover:bg-purple-50">
                  <th className="w-1/3 py-1 text-left align-top font-semibold">
                    <input
                      {...register(`tags.${index}.oldTag` as const)}
                      readOnly
                      tabIndex={-1}
                      className={clsx(
                        'w-full cursor-default bg-transparent outline-none',
                        { 'text-gray-200': secondOldTag }
                      )}
                    />
                  </th>
                  <td className="space-y-1 py-1 align-top">
                    <input
                      placeholder="name"
                      {...register(`tags.${index}.newTag` as const)}
                      className={clsx(
                        'block w-full rounded-sm border bg-yellow-50 px-1 py-0.5',
                        {
                          'text-red-500': errors?.tags?.[index]?.newTag,
                        }
                      )}
                    />
                    <div className="text-xs text-gray-300 hover:text-gray-600">
                      {JSON.stringify(newTags[field.oldTag])}
                    </div>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </form>
    </>
  )
}