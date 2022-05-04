import { CalendarIcon } from '@heroicons/react/outline'
import React from 'react'
import DatePicker, {
  CalendarContainer,
  ReactDatePickerProps
} from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'

export type DatePickerProps = {
  placeholder?: string
  value?: string
  onClick?: React.MouseEventHandler<HTMLDivElement> | undefined
}

type CalendarContainerProps = {
  className: string
  children: React.ReactNode[]
  showPopperArrow: boolean
}

export const DatePickerComponent = ({
  className,
  ...props
}: ReactDatePickerProps) => {
  const CustomInputCalendar = React.forwardRef(
    (propValue: DatePickerProps, ref: React.LegacyRef<HTMLDivElement>) => {
      return (
        <div
          className='border-[#EBF2FA] border-2 rounded-lg p-2 flex justify-between w-full cursor-pointer'
          onClick={propValue.onClick}
          ref={ref}
        >
          {' '}
          <label>{propValue.value || propValue.placeholder}</label>
          <CalendarIcon className='h-4 w-4' />
        </div>
      )
    }
  )
  CustomInputCalendar.displayName = 'CustomInputCalendar'

  const DatePickerContainer = (propsVal: CalendarContainerProps) => {
    return (
      <CalendarContainer className={propsVal.className}>
        {propsVal.showPopperArrow && (
          <div className='react-datepicker__triangle' />
        )}
        {propsVal.children}
      </CalendarContainer>
    )
  }
  return (
    <DatePicker
      popperClassName={className}
      customInput={<CustomInputCalendar />}
      calendarContainer={DatePickerContainer}
      {...props}
    />
  )
}
