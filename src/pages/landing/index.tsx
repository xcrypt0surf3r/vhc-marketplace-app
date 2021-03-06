import ExploreButton from '../../features/elements/ExploreButton'
import { AssetsListing } from '../../features/partials/AssetsListing'
import DefaultLayoutContainer from '../../features/shared/layout/DefaultLayoutContainer'
import { useGetAssetsQuery } from '../../services/assets'
import Hero from './Hero'

const Landing = () => {
  const { data, isLoading, isFetching } = useGetAssetsQuery()

  return (
    <DefaultLayoutContainer>
      <Hero />
      <AssetsListing
        assets={data?.slice(0, 12) ?? []}
        isLoading={isLoading || isFetching}
        skeletons={8}
      />
      <ExploreButton />
      {/* <Promotion /> */}
    </DefaultLayoutContainer>
  )
}

export default Landing
