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

export const GET_ASSET_BY_ID = gql`
  query getAsset($tokenId: Float!) {
    asset(tokenId: $tokenId) {
      assetData {
        vlandId
        name
        x
        y
        description
        typology
        cluster
        island
      }
      createdAtTimestamp
      creator
      owner
      tokenId
      tokenUri
    }
  }
`
