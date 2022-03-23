import { AssetsListing } from '../../features/partials/AssetsListing'
import { useGetAssetsQuery } from '../../services/assets'

const RecommendedAssets = () => {
  const { data: assets } = useGetAssetsQuery()

  return (
    <div>
      <AssetsListing
        skeleton={4}
        title='Recommended Collections'
        assets={assets ? assets.slice(0, 4) : []}
      />
    </div>
  )
}

export default RecommendedAssets
