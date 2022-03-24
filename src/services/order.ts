import { Web3Provider } from '@ethersproject/providers'
import {
  NftSwapV4,
  SignedNftOrderV4,
  SwappableAssetV4
} from '@traderxyz/nft-swap-sdk'

export const createBuyNowOrder = async (
  provider: Web3Provider,
  makerAddress: string,
  makerTokenAddress: string,
  makerTokenId: string,
  takerTokenAddress: string,
  takerTokenAmount: string,
  expiryDate: Date
): Promise<SignedNftOrderV4> => {
  const signer = provider.getSigner()
  const chainId: number = +process.env.REACT_APP_CHAIN_ID!
  const nftSwapSdk = new NftSwapV4(provider, signer, chainId)

  const makerSwapAssets: SwappableAssetV4 = {
    tokenAddress: makerTokenAddress,
    tokenId: makerTokenId,
    type: 'ERC721'
  }

  // Check if maker has approved assets to be swapped
  const makerApprovalStatus = await nftSwapSdk.loadApprovalStatus(
    makerSwapAssets,
    makerAddress
  )
  // Initiate maker asset approval for swap if necessary
  if (!makerApprovalStatus.contractApproved) {
    const approvalTx = await nftSwapSdk.approveTokenOrNftByAsset(
      makerSwapAssets,
      makerAddress
    )
    const approvalTxReceipt = approvalTx.wait()
    // eslint-disable-next-line no-console
    console.info(
      `Approved ${makerSwapAssets.tokenAddress} contract to swap with 0x - txHash: ${approvalTxReceipt}`
    )
  }

  const takerSwapAssets: SwappableAssetV4 = {
    tokenAddress: takerTokenAddress,
    amount: takerTokenAmount,
    type: 'ERC20'
  }

  const order = nftSwapSdk.buildOrder(
    makerSwapAssets,
    takerSwapAssets,
    makerAddress,
    { expiry: expiryDate }
  )
  const signedOrder = await nftSwapSdk.signOrder(order)
  console.log('signedOrder', signedOrder)
  return signedOrder
}
