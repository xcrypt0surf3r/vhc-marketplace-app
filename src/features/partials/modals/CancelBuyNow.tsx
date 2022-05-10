import { useAtom } from 'jotai'
import { Button, ButtonColors, ButtonSizes } from '../../shared/Button'
import { WarningIcon } from '../../../assets/images/icons/warning'
import { useCancelBuyNowListingMutation } from '../../../services/assets'
import { cancelBuyNowAtom } from '../../../state/atoms/listing.atoms'
import { Exception } from '../../shared/ErrorHandler'
import { useModal } from '../../../hooks/use-modal'
import ModalContainer from '../../shared/layout/ModalContainer'
import ErrorModal from './ErrorModal'

const CancelBuyNow = () => {
  const [cancelBuyNowMutation, { isLoading }] = useCancelBuyNowListingMutation()
  const [buyNowListing] = useAtom(cancelBuyNowAtom)
  const { openModal, closeModal } = useModal()

  const handleCancelBuyNow = async () => {
    if (buyNowListing?.id) {
      try {
        const cancelBuyNowResponse = await cancelBuyNowMutation({
          listingId: buyNowListing.id
        })
        if ('error' in cancelBuyNowResponse) {
          openModal(
            '',
            <ErrorModal message='Error while unlisting the item.' />
          )
          return
        }
        closeModal()
      } catch (exception) {
        const exceptionObj = exception as Exception
        openModal('', <ErrorModal message={exceptionObj.message} />)
      }
    }
  }
  return (
    <ModalContainer>
      <div className='flex flex-col justify-center items-center gap-3 mb-3'>
        <WarningIcon size={8} />
        <h2 className='text-xl text-center my-4'>
          Are you sure you want to unlist this item?
        </h2>
      </div>
      <div className='flex justify-center gap-3'>
        <Button
          onClick={handleCancelBuyNow}
          color={ButtonColors.PRIMARY}
          sizer={ButtonSizes.LARGE}
        >
          {isLoading ? 'Unlisting...' : 'Yes'}
        </Button>
        <Button
          onClick={() => closeModal()}
          color={ButtonColors.OUTLINE}
          sizer={ButtonSizes.LARGE}
        >
          Cancel
        </Button>
      </div>
    </ModalContainer>
  )
}

export default CancelBuyNow
