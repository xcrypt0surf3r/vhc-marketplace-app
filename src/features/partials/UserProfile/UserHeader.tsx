import { useWeb3React } from '@web3-react/core'
import { truncate } from '../../../utils'

const UserHeader = () => {
  const { account } = useWeb3React()

  return (
    <div className='flex flex-col items-center justify-center mb-52'>
      <img
        src='https://picsum.photos/id/60/1700/320'
        alt=''
        className='rounded-3xl animate-skeleton h-[320px] w-[1700px]'
      />
      <div className='flex justify-center'>
        <div className='absolute -translate-y-12'>
          <div className='flex flex-col text-center justify-center items-center gap-4'>
            <div className='flex justify-center items-center'>
              <img
                src='https://picsum.photos/id/19/80/80'
                alt=''
                className='rounded-full border-8 border-white h-[80px] w-[80px] animate-skeleton'
              />
            </div>
            <span className='font-prototype'>
              {account ? truncate(account, 9) : ''}
            </span>
            <div>
              Joined
              <span className='text-blue-400'>{' 2 months ago'}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default UserHeader
