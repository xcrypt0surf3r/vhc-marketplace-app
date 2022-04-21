import { useWeb3React } from '@web3-react/core'
import { Contract, ethers } from 'ethers'
import { useCallback, useEffect } from 'react'
import { useAtom } from 'jotai'
import { closeModal, openModal, Popup } from '../../../state/popup.slice'
import { Button, ButtonSizes, ButtonColors } from '../Button'
import { injected } from '../../../web3/connectors'
import { useAppDispatch } from '../../../state'
import {
  connectWalletAtom,
  disconnectWalletAtom,
  walletBalanceAtom
} from '../../../state/atoms/wallet.atoms'
import { MenuItems, ProfileMenu } from './ProfileMenu'
import { truncate } from '../../../utils'
import vhcabi from '../../../web3/abis/vhc.abi.json'

declare let window: any

const ConnectWallet = () => {
  const {
    account,
    library,
    deactivate,
    activate,
    active: networkActive,
    error: networkError
  } = useWeb3React()

  const [connectWallet, setConnectWallet] = useAtom(connectWalletAtom)
  const [disconnected, setDisconnected] = useAtom(disconnectWalletAtom)
  const [, setWalletBalance] = useAtom(walletBalanceAtom)

  const dispatch = useAppDispatch()

  const initialize = useCallback(async () => {
    const isAuthorized = await injected.isAuthorized()
    if (isAuthorized && !networkActive && !networkError) {
      activate(injected)
      setDisconnected(false)
    }
  }, [activate, networkActive, networkError, setDisconnected])

  useEffect(() => {
    const connect = async () => {
      try {
        await activate(injected)
        dispatch(closeModal())
        setConnectWallet(false)
      } catch (ex) {
        window.console.log('connect error', ex)
      }
    }
    if (connectWallet && !account) {
      if ((window as any).ethereum) {
        connect()
      } else {
        dispatch(openModal(Popup.INSTALL_WALLET))
      }
    }
  }, [account, activate, connectWallet, dispatch, setConnectWallet])

  useEffect(() => {
    // user has explicitly disconnected, so don't initialize unless
    // they initiate connection again
    if (!disconnected) {
      initialize()
    }
  }, [disconnected, initialize])

  useEffect(() => {
    if (window.ethereum) {
      window.ethereum.on('accountsChanged', async () => {
        initialize()
      })
    }
  }, [initialize])

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
      const response = await fetch(
        'https://api.coingecko.com/api/v3/simple/price?include_last_updated_at=true&ids=vault-hill-city&vs_currencies=usd'
      )
      const jsonResponse = await response.json()
      const usdAmount = vhcBalance * jsonResponse['vault-hill-city'].usd
      setWalletBalance({ currency: 'VHC', amount: vhcBalance, usdAmount })
    }
    if (account) getVhcBalance()
  }, [account, library, setWalletBalance])

  const handleConnectWallet = () => {
    dispatch(openModal(Popup.CONNECT_WALLET))
  }

  async function disconnect() {
    // this doesn't actually do anything for metamask
    // to truly disconnect the user has to do so from the browser extension
    deactivate()
    setDisconnected(true)
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
      onClick: disconnect
    }
  ]

  return (
    <>
      {account ? (
        <div>
          <Button
            className='rounded-3xl cursor-pointer'
            sizer={ButtonSizes.MEDIUM}
            color={ButtonColors.PRIMARY}
            onClick={disconnect}
          >
            {truncate(account, 6)}
          </Button>
          <ProfileMenu subMenuItems={subMenuItems} account={account} />
        </div>
      ) : (
        <Button
          magnify
          className='rounded-3xl cursor-pointer'
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
