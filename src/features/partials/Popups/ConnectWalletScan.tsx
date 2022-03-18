import { Widget } from '../../shared/Widget'
import Qrcode from '../../../assets/images/Qrcode.png'

const ConnectWalletScan = () => {
  return (
    <Widget
      heading='Connect wallet'
      description='Scan the barcode with your phone to connect your wallet'
    >
      <img src={Qrcode} />
    </Widget>
  )
}

export default ConnectWalletScan
