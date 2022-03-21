import Qrcode from '../../../assets/images/Qrcode.png'
import { Modal } from '../../shared/Modal'

const ConnectWalletScan = () => {
  return (
    <Modal
      heading='Connect wallet'
      description='Scan the barcode with your phone to connect your wallet'
    >
      <img src={Qrcode} />
    </Modal>
  )
}

export default ConnectWalletScan
