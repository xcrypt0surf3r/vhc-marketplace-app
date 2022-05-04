import { useWeb3React } from '@web3-react/core'
import UserPanels from '../../features/partials/UserProfile/UserPanels'
import DefaultLayoutContainer from '../../features/shared/layout/DefaultLayoutContainer'
import { Asset, Bid } from '../../services/queries'
import { useGetUserQuery } from '../../services/user'
import UserHeader from '../../features/partials/UserProfile/UserHeader'
import VaultHillHeader from '../../features/partials/UserProfile/VaultHillHeader'

const accountVH = process.env.REACT_APP_VHC_ADDRESS

const UserProfile = () => {
  const { account } = useWeb3React()
  const { data, isLoading, isFetching } = useGetUserQuery(
    {
      walletAddress: account ?? ''
    },
    { skip: !account }
  )

  const assetsOnSale = data?.user?.assets?.filter(
    (asset) => asset.activeListing
  )

  return (
    <DefaultLayoutContainer>
      {account === accountVH ? <VaultHillHeader /> : <UserHeader />}
      <UserPanels
        loading={isLoading || isFetching}
        panels={{
          assets: (data?.user?.assets as Asset[]) ?? [],
          onSale: assetsOnSale ?? [],
          favorites: [],
          bids: (data?.user?.bids as Bid[]) ?? [],
          activities: []
        }}
      />
    </DefaultLayoutContainer>
  )
}

export default UserProfile
