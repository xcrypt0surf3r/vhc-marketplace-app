import { defaultAssetImage, deluxeImage, exclusiveImage } from '../assets'
import { Asset } from '../services/queries'

export const getVlandImage = (
  imagesList: string[],
  value: string,
  defaultImage: string
): string => {
  const imageObj = imagesList.filter((x) => x.indexOf(value.toLowerCase()) > 0)
  return imageObj.length > 0 ? imageObj[0] : defaultImage
}

export const getAssetImage = (asset: Asset): string => {
  const assetImages: string[] = [defaultAssetImage, deluxeImage, exclusiveImage]
  return getVlandImage(assetImages, asset.assetData.typology, defaultAssetImage)
}
