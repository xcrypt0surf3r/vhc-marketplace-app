import { ArrowLeftIcon, XIcon } from '@heroicons/react/outline'
import { useAppDispatch } from '../../state'
import { closeModal } from '../../state/popup.slice'
import { classNames } from '../../utils'

export const Modal = ({
  align,
  className,
  heading,
  description,
  children
}: ModalProps) => {
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
    <div className='w-full h-full top-0 left-0 flex bg-black bg-opacity-70 fixed z-50 px-3'>
      <div
        className={classNames(
          className ?? '',
          'max-w-[26rem] m-auto border shadow px-3 py-8 md:px-10 md:pt-10 md:pb-20 rounded-xl md:rounded-2xl bg-white'
        )}
      >
        <div className='flex justify-between items-center md:mb-8 mb-6'>
          <ArrowLeftIcon className='md:h-7 md:w-7 h-6 w-6 invisible' />
          <XIcon
            onClick={() => dispatch(closeModal())}
            className='md:h-8 md:w-8 h-6 w-6 cursor-pointer hover:text-rose-600'
          />
        </div>
        {heading && (
          <h1
            className={classNames(
              alignment,
              'md:text-2xl text-xl',
              !description ? 'mb-11' : ''
            )}
          >
            {heading}
          </h1>
        )}
        {description && (
          <p className={classNames(alignment, 'text-gray-500 my-5')}>
            {description}:
          </p>
        )}
        {children}
      </div>
    </div>
  )
}

type ModalProps = {
  nav?: boolean
  align?: 'center'
  className?: string
  heading?: string
  description?: string
  children: React.ReactNode
}
