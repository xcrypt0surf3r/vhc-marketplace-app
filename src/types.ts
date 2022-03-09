import { District, Island, Typology } from './constants'

export interface Asset<Token = any> {
  id: string
  tokenId: number
  tokenUri: string
  assetData: Token
  collection: any
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
