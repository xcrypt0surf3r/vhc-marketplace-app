import { Button, ButtonSizes } from '../../shared/Button'
import ModalContainer from '../../shared/layout/ModalContainer'

const WrongNetwork = () => {
  return (
    <ModalContainer>
      <div>
        Looks like you connected to unsupported network. Change network to
        Mainnet
      </div>
      <Button sizer={ButtonSizes.FULL}>Try again</Button>
    </ModalContainer>
  )
}

export default WrongNetwork
