import { gql } from '@apollo/client'

export const GET_ASSETS = gql`
  {
    assets {
      id
      tokenId
      tokenUri
      assetData {
        typology
        vlandId
        name
      }
      collection {
        name
      }
      createdAtTimestamp
    }
  }
`
