import { ExclamationCircleIcon } from '@heroicons/react/outline'
import { useModal } from '../../../hooks/use-modal'
import { Button, ButtonColors, ButtonSizes } from '../../shared/Button'
import ModalContainer from '../../shared/layout/ModalContainer'

const TransactionFailed = ({ error }: { error?: string }) => {
  const { openPreviousModal } = useModal()

  return (
    <ModalContainer>
      <div className='flex flex-col justify-center items-center mb-8'>
        <div className='h-20 w-20 rounded-full flex justify-center bg-blue-500 items-center '>
          <ExclamationCircleIcon className='h-12 w-12 stroke-white' />
        </div>
        <h1 className='text-2xl my-4'>Error</h1>
        <p className='text-gray-500 text-center'>
          {error ?? 'There was an error processing your transaction.'}
        </p>
      </div>
      <div className='flex justify-center'>
        <Button
          color={ButtonColors.SECONDARY}
          sizer={ButtonSizes.MEDIUM}
          onClick={() => openPreviousModal()}
        >
          Retry
        </Button>
      </div>
    </ModalContainer>
  )
}

export default TransactionFailed
