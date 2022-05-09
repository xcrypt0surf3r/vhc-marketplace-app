import Qrcode from '../../../assets/images/Qrcode.png'
import ModalContainer from '../../shared/layout/ModalContainer'

const ConnectWalletScan = () => {
  return (
    <ModalContainer>
      <div>Scan the barcode with your phone to connect your wallet</div>
      <img src={Qrcode} />
    </ModalContainer>
  )
}

export default ConnectWalletScan
