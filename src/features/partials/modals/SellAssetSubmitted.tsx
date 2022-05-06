import { CheckIcon } from '@heroicons/react/outline'
import { useNavigate, useParams } from 'react-router-dom'
import { useModal } from '../../../hooks/use-modal'
import { Button, ButtonColors, ButtonSizes } from '../../shared/Button'

const SellAssetSubmitted = () => {
  const navigate = useNavigate()
  const params = useParams<{ tokenId: string }>()
  const { closeModal } = useModal()

  const handleNavigation = () => {
    closeModal()
    navigate(`/asset-details/${params.tokenId}`, {
      replace: true
    })
  }

  return (
    <div>
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
      <div className='flex justify-center'>
        <Button
          magnify
          color={ButtonColors.PRIMARY}
          sizer={ButtonSizes.MEDIUM}
          className='rounded-xl mt-8'
          onClick={handleNavigation}
        >
          Go to Asset details
        </Button>
      </div>
    </div>
  )
}

export default SellAssetSubmitted
