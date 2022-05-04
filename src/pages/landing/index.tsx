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
        skeletons={8}
        isLoading={isLoading || isFetching}
      />
      {/* <Promotion /> */}
    </DefaultLayoutContainer>
  )
}

export default Landing
