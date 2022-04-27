import { ExclamationCircleIcon } from '@heroicons/react/outline'
import { useAppDispatch } from '../../../state'
import { closeModal } from '../../../state/popup.slice'
import { Button, ButtonColors, ButtonSizes } from '../../shared/Button'
import { Modal } from '../../shared/Modal'

const BuyBidError = () => {
  const dispatch = useAppDispatch()

  return (
    <Modal className='max-w-[32rem]'>
      <div className='flex flex-col justify-center items-center mb-8'>
        <div className='h-20 w-20 rounded-full flex justify-center bg-pink-400 items-center '>
          <ExclamationCircleIcon className='h-12 w-12 stroke-white' />
        </div>
        <h1 className='text-2xl my-4 font-prototype'>Error</h1>
        <p className='text-gray-500 text-center'>
          There was an error submitting your bid. Please check your wallet
          details and try again.
        </p>
      </div>
      <div className='flex justify-center'>
        <Button
          magnify
          color={ButtonColors.SECONDARY}
          sizer={ButtonSizes.SMALL}
          className='rounded-xl'
          onClick={() => dispatch(closeModal())}
        >
          Retry
        </Button>
      </div>
    </Modal>
  )
}

export default BuyBidError
