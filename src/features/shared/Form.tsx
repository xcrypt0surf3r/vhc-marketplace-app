import { useField } from 'formik'
import { useEffect } from 'react'
import * as _ from 'lodash'
import { classNames } from '../../utils'

type FormProps = {
  noFormik?: boolean
  labelLeft?: boolean
  labelStyle?: string
  name: string
  label?: string
  id?: string
  handleChange?: () => void
  setExternalError?: React.Dispatch<React.SetStateAction<string | undefined>>
}

type FormInputProps = FormProps &
  React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  >

type FormSelectProps = FormProps &
  React.DetailedHTMLProps<
    React.SelectHTMLAttributes<HTMLSelectElement>,
    HTMLSelectElement
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
          name={name}
          className={classNames(
            meta?.error && meta?.touched
              ? 'border-red-300 focus:ring-red-500 focus:border-red-500'
              : 'border-gray-300 focus:border-blue-500 focus:ring-blue-500',
            `outline-none rounded disabled:opacity-50 placeholder-gray-400 focus:placeholder-gray-300 sm:text-md ${className}`
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
  children,
  className
}: FormInputProps) => (
  <label
    htmlFor={id || name}
    className={`block text-sm font-medium text-gray-700 mb-2 ${className}`}
  >
    {children}
  </label>
)

export const CheckBox = ({
  id,
  name,
  label,
  labelLeft,
  labelStyle,
  className,
  onChange
}: FormInputProps) => {
  return (
    <div
      className={classNames(
        labelLeft ? 'flex-row-reverse' : '',
        'flex relative items-start gap-5'
      )}
    >
      <div className='flex items-center h-5'>
        <input
          id={id}
          aria-describedby={`${name}-description`}
          name={name}
          value={label}
          type='checkbox'
          onChange={onChange}
          className={`focus:ring-indigo-500 lg:h-4 lg:w-4 text-indigo-600 border-gray-300 rounded ${className}`}
        />
      </div>
      <TextLabel name={name} className={`${labelStyle}`}>
        {_.capitalize(label)}
      </TextLabel>
    </div>
  )
}

export const Select = ({
  name,
  label,
  optionList,
  labelStyle,
  className,
  onChange
}: FormSelectProps & { optionList: string[] }) => (
  <div className=''>
    {label && (
      <TextLabel name={name} className={`${labelStyle}`}>
        {label}
      </TextLabel>
    )}
    <div className='mt-1'>
      <select
        id={name}
        name={name}
        autoComplete='country-name'
        className={`max-w-lg block focus:ring-indigo-500 focus:border-indigo-500 w-full sm:max-w-xs sm:text-sm border rounded-md ${className}`}
        onChange={onChange}
      >
        {optionList.map((op, index) => (
          <option key={index}>{op}</option>
        ))}
      </select>
    </div>
  </div>
)
