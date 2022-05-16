import DefaultLayoutContainer from '../../features/shared/layout/DefaultLayoutContainer'
import { useGetAssetsQuery } from '../../services/assets'
import AssetsListingFiltered from './AssetsListingFiltered'

const Explore = () => {
  const { data, isLoading, isFetching } = useGetAssetsQuery()

  return (
    <DefaultLayoutContainer>
      <AssetsListingFiltered
        assets={data?.slice(0, 12) ?? []}
        isLoading={isLoading || isFetching}
      />
    </DefaultLayoutContainer>
  )
}

export default Explore
