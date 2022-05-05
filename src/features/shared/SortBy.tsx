import { SwitchVerticalIcon } from '@heroicons/react/outline'

export type OrderProps = {
  by: string
  dir: 'desc' | 'asc'
}

type Prop = {
  children: React.ReactNode
  value: string
  order: OrderProps
  sorter: React.Dispatch<React.SetStateAction<OrderProps>>
}

// triggers side effect that must be handled on the parent component
const SortBy = ({ children, value, order, sorter }: Prop) => {
  return (
    <span className='flex gap-2 items-center'>
      {children}
      <span
        role='button'
        onClick={() =>
          sorter({
            by: value,
            dir: order.dir === 'asc' ? 'desc' : 'asc'
          })
        }
      >
        <SwitchVerticalIcon className='h-4 w-4 text-gray-400 hover:text-gray-700' />
      </span>
    </span>
  )
}

export default SortBy
