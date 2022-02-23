import { FilterBar, Hero, Promotion } from '../elements'
import { LayoutDefault } from '../layout'
import { NewestItems } from '../partials/NewestItems'

const Home = () => {
  return (
    <LayoutDefault>
      <Hero />
      <FilterBar />
      <NewestItems />
      <Promotion />
    </LayoutDefault>
  )
}

export { Home }
