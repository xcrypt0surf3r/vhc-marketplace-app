import { InjectedConnector } from '@web3-react/injected-connector'

export class Connector {
  static metamask = () =>
    new InjectedConnector({
      supportedChainIds: [1, 3, 4, 5, 42]
    })
}
