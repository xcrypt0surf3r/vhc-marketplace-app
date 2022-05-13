import {
  cluster,
  district,
  island,
  typology,
  vlandid,
  xycordinate,
  bannerOne,
  bannerTwo,
  bannerThree,
  bannerFour
} from '../assets'

export const getPropertyImage = (prop: string) => {
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
    case 'COORDINATES':
      return xycordinate
    default:
      return vlandid
  }
}

export const getBanner = (address?: string | null) => {
  if (!address) return bannerOne
  const banners = [bannerOne, bannerTwo, bannerThree, bannerFour]
  const reference = [
    ['0', '1', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'],
    ['2', '3', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p'],
    ['4', '5', 'q', 'r', 's', 't', 'w', 'x', 'y', 'z'],
    ['6', '7', '8', '9', 'u', 'v', 'w', 'x', 'y', 'z']
  ]
  const target = address.substring(2, 3)
  const index = reference.findIndex((arr) => arr.includes(target))
  return index ? banners[index] : bannerOne
}
