import { useParams } from 'react-router-dom'
import { SellAsset } from '../../features/partials/SellAsset'
import DefaultLayoutContainer from '../../features/shared/layout/DefaultLayoutContainer'
import { useGetAssetByTokenIdQuery } from '../../services/assets'
import { useIsOwner } from '../../hooks'

const Sell = () => {
  const params = useParams<{ tokenId: string }>()
  const { data: asset } = useGetAssetByTokenIdQuery({
    tokenId: parseFloat(params.tokenId ?? '')
  })

  const isOwner = useIsOwner(asset?.owner ?? '')

  return (
    <DefaultLayoutContainer>
      {isOwner && <SellAsset asset={asset} />}
    </DefaultLayoutContainer>
  )
}

export default Sell
