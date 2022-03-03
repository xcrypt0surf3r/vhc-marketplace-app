import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Hero from '../../features/elements/Hero'
import Promotion from '../../features/elements/Promotion'
import { AssetsListing } from '../../features/partials/AssetsListing'
import DefaultLayoutContainer from '../../features/shared/layout/DefaultLayoutContainer'
import { RootState } from '../../state'
import { getAssets } from '../../state/landingSlice'

const Landing = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getAssets())
  })

  const assets = useSelector((state: RootState) => state.landing.assets)

  return (
    <DefaultLayoutContainer>
      <Hero />
      <AssetsListing title='Newest Assets' assets={assets} />
      <Promotion />
    </DefaultLayoutContainer>
  )
}

export default Landing
