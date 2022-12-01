import React, { useEffect, useRef } from 'react'
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

  const textareaRef = useRef<HTMLTextAreaElement | null>(null)
  const { ref, ...rest } = register('tags', { required: true })

  const innerOnSubmit = handleSubmit((data: FormData) => {
    onSubmit(data.tags.split('\n'))
  })

  // Allow submitting the form with cmd+enter
  // Docs Topic Call form submit remotely:
  //    https://github.com/react-hook-form/react-hook-form/blob/master/examples/V7/remoteTriggerFormSubmit.tsx
  //    However, I had to use the solution here where we don't call handleSubmit(innerOnSubmit); which did nothing
  // Docs Topic Ref:
  //    https://react-hook-form.com/faqs#Howtosharerefusage
  // Tutorial Keyboard listender:
  //    https://www.peterbe.com/plog/command-enter-to-submit-form-focus-textarea-react
  // Thanks at https://github.com/react-hook-form/react-hook-form/discussions/9485
  useEffect(() => {
    if (!textareaRef.current) return

    const listener = (event: KeyboardEvent) => {
      if (event.key === 'Enter' && event.metaKey) {
        innerOnSubmit()
      }
    }
    textareaRef.current.addEventListener('keydown', listener)

    return () => {
      if (textareaRef.current) {
        textareaRef.current.removeEventListener('keydown', listener)
      }
    }
  }, [textareaRef.current, innerOnSubmit])

  console.log({ textareaRef })

  return (
    <form onSubmit={innerOnSubmit}>
      <textarea
        {...rest}
        ref={(element) => {
          ref(element)
          textareaRef.current = element
        }}
        className="block h-40 w-full resize rounded-md border-gray-300 font-mono text-sm shadow-sm focus:border-violet-500 focus:ring-violet-500 sm:text-sm"
        defaultValue={inputTags?.join('\n')}
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
