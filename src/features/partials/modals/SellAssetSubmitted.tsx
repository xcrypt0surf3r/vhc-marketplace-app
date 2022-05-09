import { CheckIcon } from '@heroicons/react/outline'
import { useModal } from '../../../hooks/use-modal'
import { Button, ButtonColors, ButtonSizes } from '../../shared/Button'
import ModalContainer from '../../shared/layout/ModalContainer'

const SellAssetSubmitted = () => {
  const { closeModal } = useModal()

  return (
    <ModalContainer>
      <div className='flex flex-col justify-center items-center'>
        <div className='h-20 w-20 rounded-full flex justify-center bg-blue-500 items-center '>
          <CheckIcon className='h-12 w-12 animate-check stroke-white' />
        </div>
        <h1 className='text-2xl my-4'>Your asset has been listed</h1>
        <p className='text-gray-500 text-center'>
          Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet
          sint.
        </p>
      </div>
      <div className='flex justify-center mt-8'>
        <Button
          color={ButtonColors.SECONDARY}
          sizer={ButtonSizes.MEDIUM}
          onClick={closeModal}
        >
          Done
        </Button>
      </div>
    </ModalContainer>
  )
}

export default SellAssetSubmitted
