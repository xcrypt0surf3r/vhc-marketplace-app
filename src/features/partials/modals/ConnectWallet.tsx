import { ChevronRightIcon } from '@heroicons/react/outline'
import { useAtom } from 'jotai'
import { WalletConnectIcon } from '../../../assets/images/icons/wallet-connect'
import { MetamaskIcon } from '../../../assets/images/icons/metamask'
import { connectWalletAtom } from '../../../state/atoms/wallet.atoms'
import ModalContainer from '../../shared/layout/ModalContainer'

const Wallet = ({
  title,
  description,
  icon,
  action
}: {
  title: string
  description: string
  icon: JSX.Element
  action?: () => void
}) => {
  return (
    <div className='flex items-center cursor-pointer hover:bg-[#F7F7F7] p-2 border border-transparent rounded-lg'>
      <div className='w-full flex md:gap-6 gap-4' onClick={action}>
        <div className='flex items-center md:w-[3.125rem] md:h-[3.125rem] w-[2.5rem] h-[2.5rem]'>
          {icon}
        </div>
        <div>
          <h3 className='mb-1 font-medium text-black tracking-wide'>{title}</h3>
          <p className='text-gray-400 text-sm'>{description}</p>
        </div>
      </div>
      <ChevronRightIcon className='h-7 w-7 ml-2 text-gray-700' />
    </div>
  )
}

const ConnectWalletModal = () => {
  const [, setConnectWallet] = useAtom(connectWalletAtom)

  return (
    <ModalContainer>
      <div className='flex flex-col gap-11'>
        <h3 className='text-gray-600'>
          Create or choose from the available wallet providers.
        </h3>
        <Wallet
          title='WalletConnect'
          description='Connect using your mobile wallet'
          icon={
            <div className='bg-[#3B99FC] p-2 rounded-xl '>
              <WalletConnectIcon size={3} color='white' />
            </div>
          }
        />
        <Wallet
          title='Metamask'
          description='Connect using a browser extension'
          icon={<MetamaskIcon size={4} />}
          action={() => setConnectWallet(true)}
        />
      </div>
    </ModalContainer>
  )
}

export default ConnectWalletModal
