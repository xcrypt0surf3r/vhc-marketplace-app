import { assets } from '../../fake-data'
import { Hero, Promotion } from '../elements'
import { LayoutDefault } from '../layout'
import { AssetsListing } from '../partials/AssetsListing'

const Landing = () => {
  return (
    <LayoutDefault>
      <Hero />
      <AssetsListing title='Newest Assets' assets={assets} />
      <Promotion />
    </LayoutDefault>
  )
}

export { Landing }
