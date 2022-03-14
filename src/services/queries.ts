import { gql } from '@apollo/client'

export const GET_ASSETS = gql`
  {
    assets {
      tokenId
      tokenUri
      creator
      owner
      assetData {
        vlandId
        name
        description
        typology
        district
        island
        x
        y
        cluster
      }
    }
  }
`
