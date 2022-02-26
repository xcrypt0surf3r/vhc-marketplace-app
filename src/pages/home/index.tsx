import { assets } from '../../fake-data'
import Hero from '../../features/elements/Hero'
import Promotion from '../../features/elements/Promotion'
import { AssetsListing } from '../../features/partials/AssetsListing'
import DefaultLayoutContainer from '../../features/shared/layout/DefaultLayoutContainer'

const Landing = () => {
  return (
    <DefaultLayoutContainer>
      <Hero />
      <AssetsListing title='Newest Assets' assets={assets} />
      <Promotion />
    </DefaultLayoutContainer>
  )
}

export default Landing
