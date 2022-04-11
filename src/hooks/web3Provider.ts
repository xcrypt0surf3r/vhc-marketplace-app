import { useWeb3React } from '@web3-react/core'
import { ethers } from 'ethers'

export const useWeb3Provider = async () => {
  const { connector } = useWeb3React()
  return new ethers.providers.Web3Provider(await connector?.getProvider())
}
