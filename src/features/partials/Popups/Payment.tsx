import { CheckCircleIcon } from '@heroicons/react/solid'
import { useState } from 'react'
import { Button, ButtonColors, ButtonSizes } from '../../shared/Form'
import { Modal } from '../../shared/Modal'

const Payment = () => {
  const [approve, setApprove] = useState(false)
  const [sign, setSign] = useState(false)

  return (
    <Modal heading='Payment' align='center' className='max-w-[32rem]'>
      <div className='grid grid-cols-1 divide-y gap-6'>
        <div className='flex gap-x-6'>
          {!approve ? (
            <span className='text-xs bg-slate-200 text-indigo-300 rounded-full h-6 w-6 shrink-0 flex items-center justify-center'>
              1
            </span>
          ) : (
            <CheckCircleIcon className='h-6 w-6 shrink-0 text-blue-700' />
          )}
          <div className='flex flex-col gap-y-5'>
            <span className='font-medium'>Approve currency</span>
            <span className='text-sm text-gray-600'>
              Submit a transaction with your wallet to trade with this currency.
              This only needs to be done once.
            </span>
            {!approve && (
              <Button
                sizer={ButtonSizes.SMALL}
                color={ButtonColors.GRADIENT}
                className='rounded-xl'
                onClick={() => setApprove(true)}
              >
                Unlock
              </Button>
            )}
          </div>
        </div>
        <div className='flex gap-x-6 pt-6'>
          {!sign ? (
            <span className='text-xs bg-slate-200 text-indigo-300 rounded-full h-6 w-6 shrink-0 flex items-center justify-center'>
              2
            </span>
          ) : (
            <CheckCircleIcon className='h-6 w-6 shrink-0 text-blue-700' />
          )}
          <div className='flex flex-col gap-y-5'>
            <span className='font-medium'>Sign message</span>
            <span className='text-sm text-gray-600'>
              Sign a message using your wallet to continue
            </span>
            {approve && !sign && (
              <Button
                sizer={ButtonSizes.SMALL}
                color={ButtonColors.GRADIENT}
                className='rounded-xl'
                onClick={() => setSign(true)}
              >
                Sign
              </Button>
            )}
          </div>
        </div>
        {approve && sign && (
          <div className='pt-5'>
            <Button
              color={ButtonColors.GRADIENT}
              sizer={ButtonSizes.FULL}
              className='rounded-xl'
            >
              Finish
            </Button>
          </div>
        )}
      </div>
    </Modal>
  )
}

export default Payment
