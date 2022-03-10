import { useWeb3React } from '@web3-react/core'
import { Connector } from './connectors'

export const connectMetamaskButton = () => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const web3reactContext = useWeb3React()

  const connectMetamask = async () => {
    try {
      await web3reactContext.activate(Connector.metamask())
    } catch (err) {
      return err
    }
    return web3reactContext
  }

  return <button onClick={connectMetamask}>Connect Metamask</button>
}
