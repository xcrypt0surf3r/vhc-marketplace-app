import { getPopup, Popup } from '../../../state/popup.slice'
import { useAppSelector } from '../../../state/store'
import BuyNow from './BuyNow'
import Checkout from './Checkout'
import ConnectWallet from './ConnectWallet'
import ConnectWalletScan from './ConnectWalletScan'
import InstallWallet from './InstallWallet'
import OrderComplete from './OrderComplete'
import Payment from './Payment'
import WrongNetwork from './WrongNetwork'

const Popups = () => {
  let modal: any
  const popups = useAppSelector(getPopup)
  switch (popups.modal) {
    case Popup.CONNECT_WALLET:
      modal = <ConnectWallet />
      break
    case Popup.CONNECT_WALLET_SCAN:
      modal = <ConnectWalletScan />
      break
    case Popup.INSTALL_WALLET:
      modal = <InstallWallet />
      break
    case Popup.WRONG_NETWORK:
      modal = <WrongNetwork />
      break
    case Popup.BUY_NOW:
      modal = <BuyNow />
      break
    case Popup.CHECKOUT:
      modal = <Checkout />
      break
    case Popup.PAYMENT:
      modal = <Payment />
      break
    case Popup.ORDER_COMPLETE:
      modal = <OrderComplete />
      break
    default:
      break
  }
  return <>{modal}</>
}

export default Popups
