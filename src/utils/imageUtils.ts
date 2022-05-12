import {
  cluster,
  district,
  island,
  typology,
  vlandid,
  xycordinate
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
