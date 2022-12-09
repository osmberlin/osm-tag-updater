import { clsx } from 'clsx'
import React, { useEffect } from 'react'
import { useFieldArray, useForm } from 'react-hook-form'
import { TagsNewTagsObjects } from '../transpose'
import { TextWithMarkdownLink } from './utils'

type Props = {
  newTagObjects: TagsNewTagsObjects
  setOutputTags: (tags: string[]) => void
}

type FormValues = {
  tags: {
    oldTag: string
    newTag: string
  }[]
}

export const Table: React.FC<Props> = ({ newTagObjects, setOutputTags }) => {
  // Docs https://react-hook-form.com/api/usefieldarray/
  const {
    register,
    control,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      tags: [],
    },
    mode: 'onChange',
  })
  const { fields, append } = useFieldArray<FormValues>({
    name: 'tags',
    control,
  })

  const onChange = handleSubmit((data: FormValues) => {
    setOutputTags(data.tags.map((d) => d.newTag))
  })

  const populateAndCleanupForm = () => {
    const initialOutputTags: string[] = []
    Object.entries(newTagObjects).map(([oldTag, newTagObject]) => {
      newTagObject.newTags.map((newTag) => {
        append({ oldTag, newTag })
        initialOutputTags.push(newTag)
      })
    })
    setOutputTags(initialOutputTags)
  }

  useEffect(() => {
    reset()
    populateAndCleanupForm()
  }, [newTagObjects])

  let oldTagStore = '' // Used for styling

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
              const secondOldTag = oldTagStore === field.oldTag // Used for styling
              oldTagStore = field.oldTag
              const newTagObject = newTagObjects[field.oldTag]

              return (
                <tr key={field.id} className="border-b hover:bg-purple-50">
                  <th
                    className={clsx(
                      'w-1/3 py-1 text-left align-top font-semibold',
                      { 'text-gray-200': secondOldTag }
                    )}
                  >
                    {field.oldTag}
                  </th>
                  <td className="space-y-1 py-1 align-top">
                    <input
                      placeholder="name"
                      {...register(`tags.${index}.newTag` as const)}
                      className={clsx(
                        'block w-full min-w-0 flex-1 rounded-none rounded-r-md border-gray-300 px-3 py-2 focus:border-red-500 focus:ring-red-500 sm:text-sm',
                        {
                          'text-red-500': errors?.tags?.[index]?.newTag,
                        }
                      )}
                    />
                    {!!newTagObject?.msg && (
                      <div className="prose prose-sm rounded bg-amber-200 py-1 px-2 leading-tight">
                        <TextWithMarkdownLink>
                          {newTagObject.msg}
                        </TextWithMarkdownLink>
                      </div>
                    )}
                    {field.newTag.startsWith('fixme=') &&
                      newTagObject.missingField && (
                        <div className="prose prose-sm rounded bg-orange-200 py-1 px-2 leading-tight">
                          {/* Test this with `parking:lane:{SIDE}=marked` */}
                          <TextWithMarkdownLink>
                            {newTagObject.missingField.msg}
                          </TextWithMarkdownLink>
                          <ul className="marker:text-white">
                            {newTagObject.missingField?.values?.map((v) => {
                              const newValue = `${newTagObject.missingField?.key}=${v}`
                              return (
                                <li key={v}>
                                  <button
                                    type="button"
                                    className="my-0 font-mono underline hover:underline-offset-2"
                                    onClick={() => {
                                      setValue(`tags.${index}.newTag`, newValue)
                                      onChange()
                                    }}
                                  >
                                    {newValue}{' '}
                                  </button>
                                </li>
                              )
                            })}
                          </ul>
                        </div>
                      )}
                    <div className="text-xs text-gray-300 hover:text-gray-600">
                      {JSON.stringify(newTagObject)}
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
