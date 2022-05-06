import Qrcode from '../../../assets/images/Qrcode.png'

const ConnectWalletScan = () => {
  return (
    <div>
      <div>Scan the barcode with your phone to connect your wallet</div>
      <img src={Qrcode} />
    </div>
  )
}

export default ConnectWalletScan
