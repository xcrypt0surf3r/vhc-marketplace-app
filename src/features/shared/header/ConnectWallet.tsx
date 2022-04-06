import { useWeb3React } from '@web3-react/core'
import { useCallback, useEffect, useState } from 'react'
import { useAtom } from 'jotai'
import { closeModal, openModal, Popup } from '../../../state/popup.slice'
import { Button, ButtonSizes, ButtonColors } from '../Form'
import { injected } from '../../../web3/connectors'
import { useAppDispatch } from '../../../state'
import {
  connectWalletAtom,
  disconnectWalletAtom
} from '../../../state/atoms/wallet.atoms'
import { MenuItems, ProfileMenu } from './ProfileMenu'
import { convertHexToEthNumber, truncate } from '../../../utils'

declare let window: any

const ConnectWallet = () => {
  const {
    account,
    deactivate,
    activate,
    active: networkActive,
    error: networkError
  } = useWeb3React()

  const [connectWallet, setConnectWallet] = useAtom(connectWalletAtom)
  const [disconnected, setDisconnected] = useAtom(disconnectWalletAtom)
  const [balance, setBalance] = useState(0)
  const [balanceInDollar, setBalanceInDollar] = useState(0)

  const dispatch = useAppDispatch()

  const initialize = useCallback(async () => {
    const isAuthorized = await injected.isAuthorized()
    if (isAuthorized && !networkActive && !networkError) {
      activate(injected)
      setDisconnected(false)
    }
  }, [activate, networkActive, networkError, setDisconnected])

  useEffect(() => {
    const handleWalletBalance = async () => {
      const { ethereum } = window
      if (ethereum) {
        ethereum.sendAsync(
          {
            method: 'eth_getBalance',
            params: [ethereum.selectedAddress, 'latest']
          },
          (err: string, response: any) => {
            if (!err) {
              const etherValue = convertHexToEthNumber(response.result)
              setBalance(etherValue)

              fetch('https://api.coinbase.com/v2/prices/ETH-USD/buy')
                .then((responseData) => responseData.json())
                .then((responseValue: any) => {
                  debugger // eslint-disable-line no-debugger
                  const usdPrice = etherValue * responseValue.data.amount
                  setBalanceInDollar(usdPrice)
                })
            }
          }
        )
      }
    }

    const connect = async () => {
      try {
        await activate(injected)
        dispatch(closeModal())
        setConnectWallet(false)
        handleWalletBalance()
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
  }, [
    account,
    activate,
    connectWallet,
    dispatch,
    initialize,
    setConnectWallet,
    balance
  ])

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
      visible: false
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
          <ProfileMenu
            subMenuItems={subMenuItems}
            account={account}
            balance={balance}
            balanceInDollar={balanceInDollar}
          />
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
