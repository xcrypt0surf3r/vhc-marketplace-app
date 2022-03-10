import { useAppSelector } from '../../state/store'
import { getWidget, Widget } from '../../state/widget.slice'
import WalletConnectWidget from '../elements/WalletConnectWidget'

const Widgets = () => {
  let widget: any
  const widgets = useAppSelector(getWidget)
  switch (widgets.open) {
    case Widget.CONNECT_WALLET:
      widget = <WalletConnectWidget />
      break
    default:
      break
  }
  return <>{widget}</>
}

export default Widgets
