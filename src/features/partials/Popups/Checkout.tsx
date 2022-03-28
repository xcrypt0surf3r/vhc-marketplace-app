import { checkout } from '../../../fake-data/buy-now'
import { useAppDispatch } from '../../../state'
import { openModal, Popup } from '../../../state/popup.slice'
import { Button, ButtonColors, ButtonSizes } from '../../shared/Form'
import { Modal } from '../../shared/Modal'

const Checkout = () => {
  const dispatch = useAppDispatch()

  const handleSubmit = () => {
    dispatch(openModal(Popup.PAYMENT))
  }

  return (
    <Modal heading='Checkout' align='center' className='max-w-[34rem]'>
      <div className='grid grid-cols-1 divide-y'>
        <div className='font-medium flex justify-between pb-5'>
          <span>Item</span>
          <span>Subtotal</span>
        </div>
        <div className='flex items-center gap-32 py-5'>
          <div className='flex gap-4 items-center'>
            <div className='bg-black h-[58px] w-[58px] rounded-xl'>
              <img src='' alt='' />
            </div>
            <div className='flex flex-col gap-1'>
              <span className='font-medium'>{'AssetName'}</span>
              <span className='text-gray-500 text-sm'>
                Quantity: {checkout.quantity}
              </span>
            </div>
          </div>
          <div className='flex flex-col items-end'>
            <span className='text-gray-500'>Price</span>
            <span className='text-lg'>$VHC {checkout.priceVHC}</span>
          </div>
        </div>
        <div className='flex justify-between py-5'>
          <span className='font-medium'>Total</span>
          <div className='flex flex-col items-end'>
            <span className='text-lg'>
              $VHC {checkout.priceVHC * checkout.quantity}
            </span>
            <span className='text-gray-500'>
              &#36;{checkout.priceUSD * checkout.quantity}
            </span>
          </div>
        </div>
        <div className='pt-5'>
          <Button
            color={ButtonColors.PRIMARY}
            sizer={ButtonSizes.FULL}
            className='rounded-xl'
            onClick={handleSubmit}
          >
            Confirm checkout
          </Button>
        </div>
      </div>
    </Modal>
  )
}

export default Checkout
