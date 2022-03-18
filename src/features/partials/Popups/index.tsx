import { useAppSelector } from '../../../state/store'
import { getPopup, Popup } from '../../../state/popup.slice'
import ConnectWallet from './ConnectWallet'
import ConnectWalletScan from './ConnectWalletScan'
import InstallWallet from './InstallWallet'
import WrongNetwork from './WrongNetwork'

const Popups = () => {
  let popup: any
  const popups = useAppSelector(getPopup)
  switch (popups.open) {
    case Popup.CONNECT_WALLET:
      popup = <ConnectWallet />
      break
    case Popup.CONNECT_WALLET_SCAN:
      popup = <ConnectWalletScan />
      break
    case Popup.INSTALL_WALLET:
      popup = <InstallWallet />
      break
    case Popup.WRONG_NETWORK:
      popup = <WrongNetwork />
      break
    default:
      break
  }
  return <>{popup}</>
}

export default Popups
