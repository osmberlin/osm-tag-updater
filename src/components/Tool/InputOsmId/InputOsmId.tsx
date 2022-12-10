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
        <div className="group flex items-center">
          <div className="-pr-px inline-flex h-5 rounded-l border border-r-0 bg-gray-100 pl-1 pr-0.5 text-xs group-hover:bg-blue-50">
            way/
          </div>
          <input
            {...register('wayId', { required: true })}
            type="number"
            className="h-5 w-24 rounded-sm border p-0.5 text-xs group-hover:bg-blue-50"
            defaultValue={currentWayId}
            placeholder="OSM Way ID"
          />
          {errors.wayId && (
            <span className="inline-flex h-5 items-center bg-red-100 px-1 text-xs text-red-700">
              Is Required
            </span>
          )}
        </div>
        <button
          type="submit"
          className="flex h-5 items-center rounded border bg-gray-50 px-0.5 text-xs font-semibold shadow hover:bg-blue-50"
        >
          Load
        </button>
      </form>
    </>
  )
}
