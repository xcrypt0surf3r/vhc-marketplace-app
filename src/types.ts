import { District, Island, Typology } from './__generated/enums'

export interface Asset<Token = any> {
  tokenId: number
  tokenUri: string
  assetData: Token
  createdAtTimestamp: Date
  creator: string
  owner: string
}
export interface Vland {
  vlandId: string
  name: string
  typology: Typology
  description: string
  district: District
  island: Island
  x: number
  y: number
  cluster: number
}

export enum ListingType {
  AUCTION = 'AUCTION',
  BUY_NOW = 'BUY_NOW'
}
