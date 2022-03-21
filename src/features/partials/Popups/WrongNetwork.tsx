import { Button, ButtonSizes } from '../../shared/Form'
import { Modal } from '../../shared/Modal'

const WrongNetwork = () => {
  return (
    <Modal
      align='center'
      heading='Wrong network'
      description='Looks like you connected to unsupported network. Change network to Mainnet'
    >
      <Button sizer={ButtonSizes.FULL} className='rounded-xl'>
        Try again
      </Button>
    </Modal>
  )
}

export default WrongNetwork
