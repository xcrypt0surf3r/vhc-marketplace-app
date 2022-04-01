import { AssetsListing } from '../../features/partials/AssetsListing'
import { useGetAssetsQuery } from '../../services/assets'

const RecommendedAssets = () => {
  const { data, isLoading, isFetching } = useGetAssetsQuery()

  return (
    <div>
      <AssetsListing
        skeletons={4}
        title='Recommended Collections'
        assets={data?.slice(0, 4) ?? []}
        isLoading={isLoading || isFetching}
      />
    </div>
  )
}

export default RecommendedAssets
