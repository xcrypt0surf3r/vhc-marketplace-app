import { XIcon } from '@heroicons/react/outline'
import { useAppDispatch } from '../../state'
import { closePopup } from '../../state/popup.slice'
import { classNames } from '../../utils'

export const Widget = ({
  align,
  heading,
  description,
  children
}: WidgetProps) => {
  let alignment: string
  const dispatch = useAppDispatch()
  switch (align) {
    case 'center':
      alignment = 'text-center'
      break
    default:
      alignment = 'text-left'
      break
  }
  return (
    <div
      onClick={() => dispatch(closePopup())}
      className='w-full h-full top-0 left-0 bg-black bg-opacity-70 fixed z-50 px-3'
    >
      <div className='max-w-[25.4375rem] mx-auto border shadow px-3 py-5 md:px-10 md:pt-10 md:pb-20 rounded-xl md:rounded-3xl m-3 mt-20 bg-white'>
        <XIcon
          onClick={() => dispatch(closePopup())}
          className='md:h-8 md:w-8 h-6 w-6 md:mb-8 mb-4 cursor-pointer hover:text-rose-600'
        />
        <h1
          className={classNames(alignment, 'md:text-2xl text-xl mb-4 md:mb-6')}
        >
          {heading}
        </h1>
        {description && (
          <p className={classNames(alignment, 'text-gray-500 mb-10')}>
            {description}:
          </p>
        )}
        {children}
      </div>
    </div>
  )
}

type WidgetProps = {
  align?: 'center'
  heading: string
  description?: string
  children: React.ReactNode
}
