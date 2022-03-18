import { Widget } from '../../shared/Widget'
import { Button, ButtonSizes } from '../../shared/Form'

const WrongNetwork = () => {
  return (
    <Widget
      align='center'
      heading='Wrong network'
      description='Looks like you connected to unsupported network. Change network to Mainnet'
    >
      <Button sizer={ButtonSizes.LARGE} className='w-full rounded-xl'>
        Try again
      </Button>
    </Widget>
  )
}

export default WrongNetwork
