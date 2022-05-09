import { useAtom } from 'jotai'
import { checkout } from '../../../fake-data/buy-now'
import { useModal } from '../../../hooks/use-modal'
import { listingAtom } from '../../../state/atoms/listing.atoms'
import { Button, ButtonColors, ButtonSizes } from '../../shared/Button'
import ModalContainer from '../../shared/layout/ModalContainer'
import SubmitOrder from './SubmitOrder'

const Checkout = () => {
  const [listing] = useAtom(listingAtom)
  const { openModal } = useModal()

  const handleSubmit = () => {
    openModal('Confirm Payment', <SubmitOrder />)
  }

  return (
    <ModalContainer>
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
            <span className='text-lg'>
              ${listing?.buyNow?.price.currency} {listing?.buyNow?.price.value}
            </span>
          </div>
        </div>
        <div className='flex justify-between py-5'>
          <span className='font-medium'>Total</span>
          <div className='flex flex-col items-end'>
            <span className='text-lg'>
              ${listing?.buyNow?.price.currency} {listing?.buyNow?.price.value}
            </span>
          </div>
        </div>
        <div className='pt-5'>
          <Button
            color={ButtonColors.PRIMARY}
            sizer={ButtonSizes.FULL}
            onClick={handleSubmit}
          >
            Confirm checkout
          </Button>
        </div>
      </div>
    </ModalContainer>
  )
}

export default Checkout
