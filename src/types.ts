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

export enum Typology {
  STANDARD = 'Standard',
  PREMIUM = 'Premium',
  DELUXE = 'Deluxe',
  EXCLUSIVE = 'Exclusive'
}

export enum District {
  ALPHA = 'Alpha',
  BETA = 'Beta',
  OMEGA = 'Omega',
  KAPPA = 'Kappa',
  PI = 'Pi',
  DELTA = 'Delta',
  SIGMA = 'Sigma'
}

export enum Island {
  ONE = 'One'
}
