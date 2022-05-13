import { AbstractConnector } from '@web3-react/abstract-connector'
import { InjectedConnector } from '@web3-react/injected-connector'
import { WalletConnectConnector } from '@web3-react/walletconnect-connector'

export enum ConnectorNames {
  INJECTED = 'Injected',
  WALLETCONNECT = 'WalletConnect'
}

const RPC_URLS: { [chainId: number]: string } = {
  3: process.env.REACT_APP_RPC_URL_3 as string, // ropsten - dev
  137: process.env.REACT_APP_RPC_URL_137 as string // polygon - prod
}

// Metamask - injected web3 connector
export const injected = new InjectedConnector({
  supportedChainIds: [1, 3, 4, 5, 42]
})

// Wallet Connect
export const walletConnect = new WalletConnectConnector({
  rpc: RPC_URLS,
  qrcode: true,
  supportedChainIds: [3, 137]
})

export const resetWalletConnect = (connector: AbstractConnector) => {
  if (connector instanceof WalletConnectConnector) {
    connector.walletConnectProvider = undefined
  }
}

export const connectorsByName: { [connectorName in ConnectorNames]: any } = {
  [ConnectorNames.INJECTED]: injected,
  [ConnectorNames.WALLETCONNECT]: walletConnect
}
