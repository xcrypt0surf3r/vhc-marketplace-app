import { useDispatch } from 'react-redux'
import { Button, ButtonColors, ButtonSizes } from '../../shared/Button'
import { Modal } from '../../shared/Modal'
import WarningIcon from '../../../assets/images/icons/warning.svg'
import { closeModal } from '../../../state/popup.slice'

const CancelBuyNow = () => {
  const dispatch = useDispatch()
  const cancel = async () => {
    dispatch(closeModal())
  }
  return (
    <Modal>
      <div className='flex flex-col justify-center items-center gap-3 mb-3'>
        <img src={WarningIcon} alt='warning' />
        <p className='text-xl text-center my-4'>
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
          Yes
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
    </Modal>
  )
}

export default CancelBuyNow
