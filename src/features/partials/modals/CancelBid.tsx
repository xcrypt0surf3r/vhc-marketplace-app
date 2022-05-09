import { useDispatch } from 'react-redux'
import { useAtom } from 'jotai'
import { Button, ButtonColors, ButtonSizes } from '../../shared/Button'
import { WarningIcon } from '../../../assets/images/icons/warning'
import { useCancelBidMutation } from '../../../services/bid'
import { bidAtom } from '../../../state/atoms/bid.atom'
import { Bid } from '../../../services/queries'
import { useModal } from '../../../hooks/use-modal'
import ModalContainer from '../../shared/layout/ModalContainer'

const CancelBid = () => {
  const dispatch = useDispatch()
  const [cancelBidMutation, { isLoading }] = useCancelBidMutation()
  const [bid] = useAtom(bidAtom)
  const { closeModal } = useModal()

  const cancel = async () => {
    const { listingId, id: bidId } = bid as Bid
    if (listingId && bidId) {
      await cancelBidMutation({
        listingId,
        bidId
      })
    }

    closeModal()
  }
  return (
    <ModalContainer>
      <div className='flex flex-col justify-center items-center gap-3 mb-3'>
        <WarningIcon size={8} />
        <h2 className='text-xl text-center my-4 font-prototype'>
          Are you sure you want to cancel your bid?
        </h2>
      </div>
      <div className='flex justify-center gap-3'>
        <Button
          onClick={cancel}
          color={ButtonColors.SECONDARY}
          sizer={ButtonSizes.LARGE}
        >
          {isLoading ? 'Cancelling...' : 'Yes, cancel'}
        </Button>
        <Button
          onClick={() => dispatch(closeModal())}
          color={ButtonColors.OUTLINE}
          sizer={ButtonSizes.LARGE}
        >
          No, go back
        </Button>
      </div>
    </ModalContainer>
  )
}

export default CancelBid
