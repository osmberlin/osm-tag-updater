import { buttonStyle } from '@components/Link'
import React from 'react'
import { useForm } from 'react-hook-form'

type Props = {
  currentWayId: number | string
  onSubmit: (wayId: number) => void
}

type FormData = {
  wayId: number
}

export const InputOsmId: React.FC<Props> = ({ currentWayId, onSubmit }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>()

  const innerOnSubmit = handleSubmit((data) => {
    // console.log(data)
    onSubmit(data.wayId)
  })

  return (
    <>
      <form className="flex items-center gap-1" onSubmit={innerOnSubmit}>
        <div className="flex items-center">
          <div className="-pr-px inline-flex h-8 items-center rounded-l-full border border-r-0 border-violet-600 bg-violet-200 pl-2 pr-1.5  pb-0.5 text-base text-purple-900">
            way/
          </div>
          <input
            {...register('wayId', { required: true })}
            type="number"
            className="inline-flex h-8 w-40 items-center rounded-r-full border border-violet-600 border-l-transparent p-0.5 pl-1.5 text-base focus:border-l focus:border-violet-700 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:ring-offset-2"
            defaultValue={currentWayId}
            placeholder="OSM Way ID"
          />
          {errors.wayId && (
            <span className="inline-flex h-8 items-center bg-red-100 px-1 text-xl text-red-700">
              Is Required
            </span>
          )}
        </div>
        <button type="submit" className={buttonStyle}>
          Load
        </button>
      </form>
    </>
  )
}
