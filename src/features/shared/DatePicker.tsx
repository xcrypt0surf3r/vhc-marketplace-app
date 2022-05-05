import { CalendarIcon } from '@heroicons/react/outline'
import { useField } from 'formik'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'

type Props = {
  name: string
  placeholderText?: string
  className?: string
  minDate: Date
  showPopperArrow?: boolean
}

export const Calendar = ({
  name,
  placeholderText,
  className = '',
  ...props
}: Props) => {
  const [, meta, helpers] = useField<Date | undefined>(name)
  const { value } = meta
  const { setValue } = helpers
  return (
    <>
      <div className='flex border rounded-xl p-3.5 justify-between items-center w-full'>
        <DatePicker
          className={` w-full ${className}`}
          selected={value ? new Date(value) : null}
          placeholderText={placeholderText}
          onChange={(date) => (date ? setValue(date) : setValue(undefined))}
          {...props}
        />
        <CalendarIcon className='h-4 w-4 text-gray-400' />
      </div>
      <div className='block h-2 text-red-600 mb-1 text-sm'>
        {meta?.touched && meta?.error ? meta.error : ''}
      </div>
    </>
  )
}
