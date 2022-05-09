import { useAtom } from 'jotai'
import { useState } from 'react'
import { Button, ButtonColors, ButtonSizes } from '../../shared/Button'
import WarningIcon from '../../../assets/images/icons/warning.svg'
import { useCancelBuyNowListingMutation } from '../../../services/assets'
import { cancelBuyNowAtom } from '../../../state/atoms/listing.atoms'
import { ErrorHandler } from '../../shared/ErrorHandler'
import { useModal } from '../../../hooks/use-modal'
import ModalContainer from '../../shared/layout/ModalContainer'

const CancelBuyNow = () => {
  const [cancelBuyNowMutation, { isLoading }] = useCancelBuyNowListingMutation()
  const [buyNowListing] = useAtom(cancelBuyNowAtom)
  const [reportError, setReportError] = useState(false)
  const { closeModal } = useModal()

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
        closeModal()
      } catch {
        setReportError(true)
      }
    }
  }
  return (
    <ModalContainer>
      <div className='flex flex-col justify-center items-center gap-3 mb-3'>
        <img src={WarningIcon} alt='warning' />
        <h2 className='text-xl text-center my-4'>
          Are you sure you want to unlist this item?
        </h2>
      </div>
      <div className='flex justify-center gap-3'>
        <Button
          magnify
          onClick={handleCancelBuyNow}
          color={ButtonColors.PRIMARY}
          sizer={ButtonSizes.LARGE}
        >
          {isLoading ? 'Unlisting...' : 'Yes'}
        </Button>
        <Button
          magnify
          onClick={() => closeModal()}
          color={ButtonColors.OUTLINE}
          sizer={ButtonSizes.LARGE}
        >
          Cancel
        </Button>
      </div>
      <ErrorHandler
        visible={reportError}
        message={'Error while unlisting the item.'}
      />
    </ModalContainer>
  )
}

export default CancelBuyNow
