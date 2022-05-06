import { useDispatch } from 'react-redux'
import { useAtom } from 'jotai'
import { useState } from 'react'
import { Button, ButtonColors, ButtonSizes } from '../../shared/Button'
import { Modal } from '../../shared/Modal'
import WarningIcon from '../../../assets/images/icons/warning.svg'
import { closeModal } from '../../../state/popup.slice'
import { useCancelBuyNowListingMutation } from '../../../services/assets'
import { cancelBuyNowAtom } from '../../../state/atoms/listing.atoms'
import { ErrorHandler } from '../../shared/ErrorHandler'

const CancelBuyNow = () => {
  const dispatch = useDispatch()
  const [cancelBuyNowMutation, { isLoading }] = useCancelBuyNowListingMutation()
  const [buyNowListing] = useAtom(cancelBuyNowAtom)
  const [reportError, setReportError] = useState(false)

  const handleCancelBuyNow = async () => {
    if (buyNowListing?.id) {
      try {
        const cancelBuyNowResponse = await cancelBuyNowMutation({
          listingId: buyNowListing.id
        })
        if ('error' in cancelBuyNowResponse) {
          setReportError(true)
          return
        }
        dispatch(closeModal())
      } catch {
        setReportError(true)
      }
    }
  }
  return (
    <Modal>
      <div className='flex flex-col justify-center items-center gap-3 mb-3'>
        <img src={WarningIcon} alt='warning' />
        <p className='text-xl text-center my-4'>
          Are you sure you want to unlist this item?
        </p>
      </div>
      <div className='flex justify-center gap-3'>
        <Button
          magnify
          onClick={handleCancelBuyNow}
          color={ButtonColors.SECONDARY}
          sizer={ButtonSizes.LARGE}
          className='rounded-xl'
        >
          {isLoading ? 'Unlisting...' : 'Yes'}
        </Button>
        <Button
          magnify
          onClick={() => dispatch(closeModal())}
          color={ButtonColors.OUTLINE}
          sizer={ButtonSizes.LARGE}
          className='rounded-xl'
        >
          Cancel
        </Button>
      </div>
      <ErrorHandler
        visible={reportError}
        message={'Error while unlisting the item.'}
      />
    </Modal>
  )
}

export default CancelBuyNow
