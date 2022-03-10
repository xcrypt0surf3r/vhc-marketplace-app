import { ChevronRightIcon, XIcon } from '@heroicons/react/outline'
import { WalletConnectIcon } from '../../assets/images/icons'
import metamask from '../../assets/images/logos/metamask.png'

const WalletConnectWidget = () => {
  return (
    <div className='w-full h-full top-0 left-0 bg-black bg-opacity-70 fixed z-50 px-3'>
      <div className='max-w-[25.4375rem] mx-auto border shadow px-3 py-5 md:p-10 rounded-xl md:rounded-3xl m-3 mt-28 bg-white'>
        <XIcon className='md:h-8 md:w-8 h-6 w-6 md:mb-8 mb-4 cursor-pointer hover:text-rose-600' />
        <h1 className='md:text-3xl text-xl mb-4 md:mb-6'>
          Connect your wallet
        </h1>
        <p className='text-gray-500 mb-10'>
          Choose one of available wallet providers or create a new wallet:
        </p>
        <div className='flex items-center md:mb-12 mb-5 cursor-pointer hover:border-sky-600 p-2 border border-transparent rounded-lg'>
          <div className='w-full flex md:gap-6 gap-4'>
            <div className='flex items-center justify-center p-2 rounded-xl md:w-[3.125rem] md:h-[3.125rem] w-[2.5rem] h-[2.5rem] bg-[#3B99FC]'>
              <WalletConnectIcon size={3} color='white' />
            </div>
            <div>
              <h2 className='mb-1 font-medium'>WalletConnect</h2>
              <p className='text-gray-500 text-xs'>
                Connect using your mobile wallet
              </p>
            </div>
          </div>
          <ChevronRightIcon className='h-7 w-7 ml-2 text-gray-700' />
        </div>
        <div className='flex items-center cursor-pointer hover:border-orange-600 p-2 border border-transparent rounded-lg'>
          <div className='w-full flex md:gap-6 gap-4'>
            <div className='w-[3.125rem] h-[3.125rem]'>
              <img
                src={metamask}
                alt='metamask logo'
                className='md:h-[50px] md:w-[100px] w-[80px] h-[40px] '
              />
            </div>
            <div>
              <h2 className='mb-1 font-medium'>WalletConnect</h2>
              <p className='text-gray-500 text-xs'>
                Connect using a browser extension
              </p>
            </div>
          </div>
          <ChevronRightIcon className='h-7 w-7 ml-2 text-gray-700' />
        </div>
      </div>
    </div>
  )
}

export default WalletConnectWidget
