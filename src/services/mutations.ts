import { gql } from '@apollo/client'
// import { SignedNftOrderV4 } from '@traderxyz/nft-swap-sdk'

export const CREATE_BUY_NOW = gql`
  mutation CreateBuyNow($data: SignedNftOrderV4) {
    createBuyNow(data: $data) {
      status
      order {
        direction
        maker
        taker
        expiry
        nonce
        erc20Token
        erc20TokenAmount
        fees
        erc721Token
        erc721TokenId
        erc721TokenProperties
        signature
      }
    }
  }
`
