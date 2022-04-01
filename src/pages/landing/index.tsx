import Hero from './Hero'
import Promotion from './Promotion'
import { AssetsListing } from '../../features/partials/AssetsListing'
import DefaultLayoutContainer from '../../features/shared/layout/DefaultLayoutContainer'
import { useGetAssetsQuery } from '../../services/assets'

const Landing = () => {
  const { data, isLoading, isFetching } = useGetAssetsQuery()

  return (
    <DefaultLayoutContainer>
      <Hero />
      <AssetsListing
        assets={data?.slice(0, 12) ?? []}
        skeletons={8}
        title='Newest Assets'
        isLoading={isLoading || isFetching}
      />
      <Promotion />
    </DefaultLayoutContainer>
  )
}

export default Landing
