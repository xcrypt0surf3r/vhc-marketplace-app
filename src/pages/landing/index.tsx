import Hero from './Hero'
import Promotion from './Promotion'
import { AssetsListing } from '../../features/partials/AssetsListing'
import DefaultLayoutContainer from '../../features/shared/layout/DefaultLayoutContainer'
import { useGetAssetsQuery } from '../../services/assets'

const Landing = () => {
  const { data, isLoading, isFetching, isSuccess } = useGetAssetsQuery()
  return (
    <DefaultLayoutContainer>
      <Hero />
      <AssetsListing
        data={data?.slice(0, 12)}
        skeletons={8}
        title='Newest Assets'
        loading={isLoading}
        fetching={isFetching}
        success={isSuccess}
      />
      <Promotion />
    </DefaultLayoutContainer>
  )
}

export default Landing
