import { AssetsListing } from '../../features/partials/AssetsListing'
import { useGetAssetsQuery } from '../../services/assets'

const RecommendedAssets = () => {
  const { data, isLoading, isSuccess, isFetching } = useGetAssetsQuery()

  return (
    <div>
      <AssetsListing
        skeletons={4}
        title='Recommended Collections'
        data={data?.slice(0, 4)}
        loading={isLoading}
        fetching={isFetching}
        success={isSuccess}
      />
    </div>
  )
}

export default RecommendedAssets
