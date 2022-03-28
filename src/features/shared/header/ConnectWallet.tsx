import { useWeb3React } from '@web3-react/core'
import { useCallback, useEffect } from 'react'
import { useAtom } from 'jotai'
import { closeModal, openModal, Popup } from '../../../state/popup.slice'
import { Button, ButtonSizes, ButtonColors } from '../Form'
import { injected } from '../../../web3/connectors'
import { useAppDispatch } from '../../../state'
import {
  connectWalletAtom,
  disconnectWalletAtom
} from '../../../state/atoms/wallet.atoms'
import { truncate } from '../../../utils'

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
        setDisconnected(false)
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
    setDisconnected,
    setConnectWallet
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
  return (
    <>
      {account ? (
        <Button
          className='rounded-3xl cursor-pointer'
          sizer={ButtonSizes.MEDIUM}
          color={ButtonColors.PRIMARY}
          onClick={disconnect}
        >
          {truncate(account, 8)}
        </Button>
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
