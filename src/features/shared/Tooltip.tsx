import { ExclamationCircleIcon } from '@heroicons/react/outline'
import ReactTooltip from 'react-tooltip'

type Prop = {
  children: React.ReactNode
  message: string
  show?: boolean
}

const Tooltip = ({ children, message, show = true }: Prop) => {
  return (
    <span className='flex flex-col gap-2 items-center'>
      <span className='flex gap-2 items-center'>
        {children}
        {show && (
          <button data-tip={message} data-multiline>
            <ExclamationCircleIcon className='h-4 w-4 text-gray-400 hover:text-gray-700' />
          </button>
        )}
      </span>
      <ReactTooltip />
    </span>
  )
}

export default Tooltip
