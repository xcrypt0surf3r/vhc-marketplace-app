import { useField } from 'formik'
import { useEffect } from 'react'
import { classNames } from '../../utils'

type FormProps = {
  noFormik?: boolean
  name: string
  label?: string
  id?: string
  setExternalError?: React.Dispatch<React.SetStateAction<string | undefined>>
}

type FormInputProps = FormProps &
  React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  >

export const TextInput = ({
  name,
  id,
  label,
  className,
  noFormik,
  setExternalError,
  ...props
}: FormInputProps) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [field, meta] = noFormik && !setExternalError ? [] : useField(name)
  useEffect(() => {
    if (setExternalError) setExternalError(meta?.error)
  }, [setExternalError, meta?.error])
  return (
    <div className='flex flex-col space-y-2 w-full'>
      {label && (
        <label
          htmlFor={name}
          className='block text-sm font-medium text-gray-700'
        >
          {label}
        </label>
      )}
      <div>
        <input
          className={classNames(
            meta?.error && meta?.touched
              ? 'border-red-300 focus:ring-red-500 focus:border-red-500'
              : 'border-gray-300 focus:border-blue-500 focus:ring-blue-500',
            `rounded disabled:opacity-50 ${className}`
          )}
          {...field}
          {...props}
          id={id ?? field?.name}
        />
        {meta?.touched && meta?.error && !setExternalError && (
          <div className='text-sm text-red-600 mb-1'>{meta.error}</div>
        )}
      </div>
    </div>
  )
}

export const TextLabel = ({
  id,
  name,
  children
}: {
  id?: string
  name?: string
  children: React.ReactNode
}) => (
  <label
    htmlFor={id || name}
    className='block text-sm font-medium text-gray-700 mb-2'
  >
    {children}
  </label>
)
