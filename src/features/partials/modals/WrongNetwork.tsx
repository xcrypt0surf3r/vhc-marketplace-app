import { Button, ButtonSizes } from '../../shared/Button'

const WrongNetwork = () => {
  return (
    <div>
      <div>
        Looks like you connected to unsupported network. Change network to
        Mainnet
      </div>
      <Button sizer={ButtonSizes.FULL} className='rounded-xl'>
        Try again
      </Button>
    </div>
  )
}

export default WrongNetwork
