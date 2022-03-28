import { useParams } from 'react-router-dom'
import { AssetDetails } from '../../features/partials/AssetDetails'
import DefaultLayoutContainer from '../../features/shared/layout/DefaultLayoutContainer'
import { useGetAssetByTokenIdQuery } from '../../services/assets'
import RecommendedAssets from './RecommendedAssets'

const Details = () => {
  const params: any = useParams()
  const { data, isLoading, isFetching, isSuccess } = useGetAssetByTokenIdQuery({
    tokenId: parseFloat(params.tokenId)
  })

  return (
    <DefaultLayoutContainer>
      <AssetDetails
        data={data}
        loading={isLoading}
        fetching={isFetching}
        success={isSuccess}
      />
      <RecommendedAssets />
    </DefaultLayoutContainer>
  )
}

export default Details
