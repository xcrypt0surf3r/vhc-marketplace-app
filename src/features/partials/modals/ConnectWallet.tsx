import { ChevronRightIcon } from '@heroicons/react/outline'
import { useAtom } from 'jotai'
import { WalletConnectIcon } from '../../../assets/images/icons/wallet-connect'
import metamask from '../../../assets/images/logos/metamask.png'
import { connectWalletAtom } from '../../../state/atoms/wallet.atoms'
import ModalContainer from '../../shared/layout/ModalContainer'

const ConnectWalletModal = () => {
  const [, setConnectWallet] = useAtom(connectWalletAtom)

  return (
    <ModalContainer>
      <div className='flex flex-col gap-11'>
        <h3 className='text-gray-600'>
          Create or choose from the available wallet providers.
        </h3>
        <div className='flex items-center  cursor-pointer hover:border-sky-600 p-2 border border-transparent rounded-lg'>
          <div className='w-full flex md:gap-6 gap-4'>
            <div className='flex items-center justify-center p-2 rounded-xl md:w-[3.125rem] md:h-[3.125rem] w-[2.5rem] h-[2.5rem] bg-[#3B99FC]'>
              <WalletConnectIcon size={3} color='white' />
            </div>
            <div>
              <h3 className='mb-1 font-medium text-black tracking-wide'>
                WalletConnect
              </h3>
              <p className='text-gray-400 text-sm'>
                Connect using your mobile wallet
              </p>
            </div>
          </div>
          <ChevronRightIcon className='h-7 w-7 ml-2 text-gray-700' />
        </div>
        <div className='flex items-center cursor-pointer hover:border-orange-600 p-2 border border-transparent rounded-lg'>
          <div
            className='w-full flex md:gap-6 gap-4'
            onClick={() => setConnectWallet(true)}
          >
            <div className='w-[3.125rem] h-[3.125rem]'>
              <img
                src={metamask}
                alt='metamask logo'
                className='md:h-[50px] md:w-[100px] w-[80px] h-[40px] '
              />
            </div>
            <div>
              <h3 className='mb-1 font-medium text-black -tracking-wide'>
                Metamask
              </h3>
              <p className='text-gray-400 text-sm'>
                Connect using a browser extension
              </p>
            </div>
          </div>
          <ChevronRightIcon className='h-7 w-7 ml-2 text-gray-700' />
        </div>
      </div>
    </ModalContainer>
  )
}

export default ConnectWalletModal
