import { useWeb3React } from '@web3-react/core'
import makeBlockie from 'ethereum-blockies-base64'

export const useProfileImage = () => {
  const { account } = useWeb3React()
  if (!account) return ''
  return makeBlockie(account)
}
