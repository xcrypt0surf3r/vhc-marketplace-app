import { useWeb3React } from '@web3-react/core'

export const useIsOwner = (address: string | undefined) => {
  const { account } = useWeb3React()
  if (!address) return false
  return account?.toLowerCase() === address.toLowerCase()
}
