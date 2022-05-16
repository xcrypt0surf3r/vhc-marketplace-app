import { useAtom } from 'jotai'
import { isEqual } from 'lodash'
import { Asset } from '../services/queries'
import {
  defaultFilter,
  filterAtom,
  PriceFilter
} from '../state/atoms/filter.atom'

export const useFilter = (assets: Asset[]): Asset[] => {
  const [filter] = useAtom(filterAtom)
  const isWithinPriceRange = (
    asset: Asset,
    priceRange?: PriceFilter | null
  ) => {
    const price =
      asset?.activeListing?.auction?.startingPrice ??
      asset.activeListing?.buyNow?.price

    if (!priceRange || !price) return false

    switch (priceRange?.currency) {
      case 'VHC':
        return (
          price?.value <= +priceRange.to && price?.value >= +priceRange.from
        )
      default:
        return false
    }
  }
  if (isEqual(filter, defaultFilter)) return assets
  if (filter.type.length < 1 && filter.district.length < 1) {
    return assets.filter((asset) => isWithinPriceRange(asset, filter.price))
  }
  if (filter.price) {
    return assets.filter((asset) => {
      return (
        (filter.type.includes(asset.assetData.typology) ||
          filter.district.includes(asset.assetData.district)) &&
        isWithinPriceRange(asset, filter.price)
      )
    })
  }
  return assets.filter(
    (asset) =>
      filter.type.includes(asset.assetData.typology) ||
      filter.district.includes(asset.assetData.district)
  )
}
