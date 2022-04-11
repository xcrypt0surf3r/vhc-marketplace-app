import { getPopup, Popup } from '../../../state/popup.slice'
import { useAppSelector } from '../../../state/store'
import BidSubmitted from './BidSubmitted'
import BuyBidError from './BuyBidError'
import BuyNow from './BuyNow'
import CancelBid from './CancelBid'
import Checkout from './Checkout'
import ConfirmSell from './ConfirmSell'
import ConnectWallet from './ConnectWallet'
import ConnectWalletScan from './ConnectWalletScan'
import InstallWallet from './InstallWallet'
import OrderConfirmed from './OrderConfirmed'
import Payment from './Payment'
import PlaceBid from './PlaceBid'
import SellAssetSubmitted from './SellAssetSubmitted'
import WrongNetwork from './WrongNetwork'
import CancelBuyNow from './CancelBuyNow'

const Popups = () => {
  let modal: any
  const popups = useAppSelector(getPopup)
  switch (popups.modal.at(-1)) {
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
    case Popup.ORDER_CONFIRMED:
      modal = <OrderConfirmed />
      break
    case Popup.BID_SUBMITTED:
      modal = <BidSubmitted />
      break
    case Popup.PLACE_BID:
      modal = <PlaceBid />
      break
    case Popup.BUY_BID_ERROR:
      modal = <BuyBidError />
      break
    case Popup.CANCEL_BID:
      modal = <CancelBid />
      break
    case Popup.CONFIRM_SELL:
      modal = <ConfirmSell />
      break
    case Popup.SELL_ASSET_SUBMITTED:
      modal = <SellAssetSubmitted />
      break
    case Popup.CANCEL_BUY_NOW:
      modal = <CancelBuyNow />
      break
    default:
      break
  }
  return <>{modal}</>
}

export default Popups
