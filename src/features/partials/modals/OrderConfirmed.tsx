import { CheckIcon } from '@heroicons/react/outline'

const OrderConfirmed = () => {
  return (
    <div>
      <div className='flex flex-col justify-center items-center'>
        <div className='h-20 w-20 rounded-full flex justify-center bg-blue-500 items-center '>
          <CheckIcon className='h-12 w-12 animate-check stroke-white' />
        </div>
        <h1 className='text-2xl my-4'>You order is confirmed</h1>
        <p className='text-gray-500 text-center'>
          Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet
          sint.
        </p>
      </div>
    </div>
  )
}

export default OrderConfirmed
