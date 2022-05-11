import { CheckIcon } from '@heroicons/react/outline'
import ModalContainer from '../../shared/layout/ModalContainer'

const TransactionComplete = () => {
  return (
    <ModalContainer>
      <div className='flex flex-col justify-center items-center'>
        <div className='h-20 w-20 rounded-full flex justify-center bg-blue-500 items-center '>
          <CheckIcon className='h-12 w-12 animate-check stroke-white' />
        </div>
        <h1 className='text-2xl my-4'>Transaction complete</h1>
        <p className='text-gray-500 text-center'>
          You have completed sale of your asset
        </p>
      </div>
    </ModalContainer>
  )
}

export default TransactionComplete
