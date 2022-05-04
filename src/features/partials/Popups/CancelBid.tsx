import { useDispatch } from 'react-redux'
import { useAtom } from 'jotai'
import { Button, ButtonColors, ButtonSizes } from '../../shared/Button'
import { Modal } from '../../shared/Modal'
import WarningIcon from '../../../assets/images/icons/warning.svg'
import { closeModal } from '../../../state/popup.slice'
import { useCancelBidMutation } from '../../../services/bid'
import { bidAtom } from '../../../state/atoms/bid.atom'
import { Bid } from '../../../services/queries'

const CancelBid = () => {
  const dispatch = useDispatch()
  const [cancelBidMutation, { isLoading }] = useCancelBidMutation()
  const [bid] = useAtom(bidAtom)
  const cancel = async () => {
    const { listingId, id: bidId } = bid as Bid
    if (listingId && bidId) {
      await cancelBidMutation({
        listingId,
        bidId
      })
    }

    dispatch(closeModal())
  }
  return (
    <Modal className='max-w-[32rem]'>
      <div className='flex flex-col justify-center items-center gap-3 mb-3'>
        <img src={WarningIcon} alt='warning' />
        <p className='text-xl text-center my-4 font-prototype'>
          Are you sure you want to cancel your bid?
        </p>
      </div>
      <div className='flex justify-center gap-3'>
        <Button
          magnify
          onClick={cancel}
          color={ButtonColors.SECONDARY}
          sizer={ButtonSizes.LARGE}
          className='rounded-xl'
        >
          {isLoading ? 'Cancelling...' : 'Yes, cancel'}
        </Button>
        <Button
          magnify
          onClick={() => dispatch(closeModal())}
          color={ButtonColors.OUTLINE}
          sizer={ButtonSizes.LARGE}
          className='rounded-xl'
        >
          No, go back
        </Button>
      </div>
    </Modal>
  )
}

export default CancelBid
