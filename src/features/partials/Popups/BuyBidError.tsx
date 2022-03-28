import { ExclamationCircleIcon } from '@heroicons/react/outline'
import { Button, ButtonColors, ButtonSizes } from '../../shared/Form'
import { Modal } from '../../shared/Modal'

const BuyBidError = () => {
  return (
    <Modal>
      <div className='flex flex-col justify-center items-center mb-8'>
        <div className='h-20 w-20 rounded-full flex justify-center bg-pink-400 items-center '>
          <ExclamationCircleIcon className='h-12 w-12 stroke-white' />
        </div>
        <h1 className='text-2xl my-4'>There was an error</h1>
        <p className='text-gray-500 text-center'>
          Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet
          sint.
        </p>
      </div>
      <div className='flex justify-center'>
        <Button
          magnify
          color={ButtonColors.PRIMARY}
          sizer={ButtonSizes.SMALL}
          className='rounded-xl'
        >
          Retry
        </Button>
      </div>
    </Modal>
  )
}

export default BuyBidError
