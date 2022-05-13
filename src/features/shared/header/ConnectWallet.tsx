import { useWeb3React } from '@web3-react/core'
import { Contract, ethers } from 'ethers'
import { useCallback, useEffect } from 'react'
import { useAtom } from 'jotai'
import { InjectedConnector } from '@web3-react/injected-connector'
import { Button, ButtonSizes, ButtonColors } from '../Button'
import {
  activatedConnectorAtom,
  walletBalanceAtom
} from '../../../state/atoms/wallet.atoms'
import { MenuItems, ProfileMenu } from './ProfileMenu'
import { currencyExchange, truncate } from '../../../utils'
import vhcabi from '../../../web3/abis/vhc.abi.json'
import { useModal } from '../../../hooks/use-modal'
import ConnectWalletModal from '../../partials/modals/ConnectWallet'
import { useEagerConnect, useInactiveListener } from '../../../hooks'
import { resetWalletConnect } from '../../../web3/connectors'
import InstallWallet from '../../partials/modals/InstallWallet'

declare let window: any

const ConnectWallet = () => {
  const { account, library, deactivate, activate } = useWeb3React()
  const { openModal, closeModal } = useModal()

  const [activatedConnector, setActivatedConnector] = useAtom(
    activatedConnectorAtom
  )
  const [, setWalletBalance] = useAtom(walletBalanceAtom)

  const handleConnectionError = useCallback(() => {
    if (activatedConnector !== undefined) resetWalletConnect(activatedConnector)
    if (
      activatedConnector instanceof InjectedConnector &&
      !(window as any).ethereum
    ) {
      openModal('Install Wallet', <InstallWallet />)
    }
  }, [activatedConnector, openModal])

  useEffect(() => {
    if (activatedConnector !== undefined) {
      resetWalletConnect(activatedConnector)
      activate(activatedConnector, (error) => {
        // eslint-disable-next-line no-console
        console.error(error)
        handleConnectionError()
      })
      setActivatedConnector(undefined)
      closeModal()
    }
  }, [
    activate,
    closeModal,
    activatedConnector,
    setActivatedConnector,
    openModal,
    handleConnectionError
  ])

  useEffect(() => {
    const getVhcBalance = async () => {
      const contract = new Contract(
        process.env.REACT_APP_VHC_ADDRESS!,
        vhcabi,
        library
      )
      const vhcBalanceBN = await contract.balanceOf(account)
      // Convert from BigNumber to string for UI
      const vhcBalance = +ethers.utils.formatEther(vhcBalanceBN)

      // Get current value of VHC in $ from coingecko
      const usdBalance = await currencyExchange(vhcBalance)

      setWalletBalance({
        USD: { currency: 'USD', value: usdBalance },
        VHC: { currency: 'VHC', value: vhcBalance }
      })
    }
    if (account) getVhcBalance()
  }, [account, library, setWalletBalance])

  // attempt to connect to inject ethereum provider
  const triedEager = useEagerConnect()

  // handles events from injected ethereum provider if it exists
  useInactiveListener(!triedEager || !!activatedConnector)

  const handleConnectWallet = () => {
    openModal('Connect your wallet', <ConnectWalletModal />)
  }

  const subMenuItems: MenuItems[] = [
    {
      name: 'My profile',
      visible: true,
      link: '/profile'
    },
    {
      name: 'Edit profile',
      visible: false
    },
    {
      name: 'Log out',
      visible: true,
      onClick: deactivate
    }
  ]

  return (
    <>
      {account ? (
        <div>
          <Button sizer={ButtonSizes.MEDIUM} color={ButtonColors.PRIMARY}>
            {truncate(account, 6)}
          </Button>
          <ProfileMenu subMenuItems={subMenuItems} account={account} />
        </div>
      ) : (
        <Button
          sizer={ButtonSizes.MEDIUM}
          color={ButtonColors.PRIMARY}
          onClick={handleConnectWallet}
        >
          Connect Wallet
        </Button>
      )}
    </>
  )
}

export default ConnectWallet
