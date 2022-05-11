import {
  standardImage,
  deluxeImage,
  exclusiveImage,
  premiumImage,
  cluster,
  district,
  island,
  typology,
  vlandid,
  xycordinate
} from '../assets'
import { Asset } from '../services/queries'
import { Typology } from '../__generated/enums'

enum Typologies {
  STANDARD = 'STANDARD',
  PREMIUM = 'PREMIUM',
  DELUXE = 'DELUXE',
  EXCLUSIVE = 'EXCLUSIVE'
}

const getVlandImage = (typo: Typology): string => {
  switch (typo) {
    case Typologies.STANDARD:
      return standardImage
    case Typologies.DELUXE:
      return deluxeImage
    case Typologies.PREMIUM:
      return premiumImage
    case Typologies.EXCLUSIVE:
      return exclusiveImage
    default:
      return standardImage
  }
}

const getpropertyImage = (prop: string) => {
  switch (prop.toUpperCase()) {
    case 'VLANDID':
      return vlandid
    case 'TYPOLOGY':
      return typology
    case 'DISTRICT':
      return district
    case 'ISLAND':
      return island
    case 'CLUSTER':
      return cluster
    case 'X,Y':
      return xycordinate
    default:
      return vlandid
  }
}

export const getImage = (item: Asset | string): string => {
  if (typeof item === 'string') return getpropertyImage(item)
  if ((item as Asset)?.assetData?.typology)
    return getVlandImage((item as Asset).assetData.typology)
  return ''
}
