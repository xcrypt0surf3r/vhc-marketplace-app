import { useEffect, useState } from 'react'
import { AssetsListing } from '../../features/partials/AssetsListing'
import { useFilter } from '../../hooks'
import { Asset } from '../../services/queries'
import FilterByDistrict from './FilterByDistrict'
import FilterByFileType from './FilterByFileType'
import FilterByPrice from './FilterByPrice'
import SearchHero from './SearchHero'

const AssetsListingFiltered = ({
  assets,
  isLoading
}: {
  assets: Asset[]
  isLoading?: boolean
}) => {
  const [filtered, setFiltered] = useState<Asset[]>(assets)

  useEffect(() => {
    if (assets) {
      setFiltered(assets)
    }
  }, [setFiltered, assets])

  const filterResult = useFilter(filtered)

  return (
    <>
      <SearchHero total={filterResult.length} />
      <div className='lg:grid grid-cols-4 lg:space-x-5'>
        <div className='flex flex-col gap-4 mb-4 lg:mb-0'>
          <FilterByFileType />
          <FilterByDistrict />
          <FilterByPrice />
        </div>
        <div className='col-span-3'>
          <AssetsListing
            assets={filterResult}
            isLoading={isLoading}
            skeletons={4}
            short
          />
        </div>
      </div>
    </>
  )
}

export default AssetsListingFiltered
