import { CheckIcon } from '@heroicons/react/outline'
import { Modal } from '../../shared/Modal'

const BidSubmitted = () => {
  return (
    <Modal className='max-w-[32rem]'>
      <div className='flex flex-col justify-center items-center'>
        <div className='h-20 w-20 rounded-full flex justify-center bg-blue-500 items-center '>
          <CheckIcon className='h-12 w-12 animate-check stroke-white' />
        </div>
        <h1 className='text-2xl my-4'>Your bid is placed</h1>
        <p className='text-gray-500 text-center'>
          Your bid for this land was submitted successfully
        </p>
      </div>
    </Modal>
  )
}

export default BidSubmitted
