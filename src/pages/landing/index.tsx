import Hero from './Hero'
import Promotion from './Promotion'
import { AssetsListing } from '../../features/partials/AssetsListing'
import DefaultLayoutContainer from '../../features/shared/layout/DefaultLayoutContainer'
import { useGetAssetsQuery } from '../../services/assets'

const Landing = () => {
  const { data: assets } = useGetAssetsQuery()

  return (
    <DefaultLayoutContainer>
      <Hero />
      <AssetsListing
        skeleton={14}
        title='Newest Assets'
        assets={assets || []}
      />
      <Promotion />
    </DefaultLayoutContainer>
  )
}

export default Landing
