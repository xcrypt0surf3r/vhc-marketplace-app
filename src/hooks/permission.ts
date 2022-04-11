import { useWeb3React } from '@web3-react/core'

export const useIsOwner = (account: string) => {
  const { account: web3Account } = useWeb3React()
  return web3Account?.toLowerCase() === account.toLowerCase()
}
