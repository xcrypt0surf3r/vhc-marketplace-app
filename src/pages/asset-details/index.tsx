import { useParams } from 'react-router-dom'
import { AssetDetails } from '../../features/partials/AssetDetails'
import DefaultLayoutContainer from '../../features/shared/layout/DefaultLayoutContainer'
import { useGetAssetByTokenIdQuery } from '../../services/assets'
import RecommendedAssets from './RecommendedAssets'

const Details = () => {
  const params: any = useParams()
  const { data: asset } = useGetAssetByTokenIdQuery({
    tokenId: parseFloat(params.tokenId)
  })

  return (
    <DefaultLayoutContainer>
      {asset && <AssetDetails data={asset} />}
      <RecommendedAssets />
    </DefaultLayoutContainer>
  )
}

export default Details
