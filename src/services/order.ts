import { Web3Provider } from '@ethersproject/providers'
import {
  NftSwapV4,
  SignedERC721OrderStruct,
  SwappableAssetV4,
  UserFacingERC20AssetDataSerializedV4,
  UserFacingERC721AssetDataSerializedV4
} from '@traderxyz/nft-swap-sdk'

export const initSwapSdk = (provider: Web3Provider): NftSwapV4 => {
  const signer = provider.getSigner()
  const chainId: number = +process.env.REACT_APP_CHAIN_ID!
  const nftSwapSdk = new NftSwapV4(provider, signer, chainId)
  return nftSwapSdk
}

export const approveAssetsForSwap = async (
  provider: Web3Provider,
  walletAddress: string,
  swapAssets: SwappableAssetV4
): Promise<{ approved: boolean }> => {
  try {
    const nftSwapSdk = initSwapSdk(provider)

    const approvalStatus = await nftSwapSdk.loadApprovalStatus(
      swapAssets,
      walletAddress
    )

    // Initiate asset approval for swap if necessary
    if (!approvalStatus.contractApproved) {
      // This will throw an error if the user rejects the approval - handle accordingly.
      const approvalTx = await nftSwapSdk.approveTokenOrNftByAsset(
        swapAssets,
        walletAddress
      )
      const approvalTxReceipt = approvalTx.wait()
      // eslint-disable-next-line no-console
      console.info(
        `Approved ${swapAssets.tokenAddress} contract to swap with 0x - txHash: ${approvalTxReceipt}`
      )
    }
    return { approved: true }
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error)
    return { approved: false }
  }
}

// This function should be called following `approveAssetsForSwap` for the makers assets
export const createBuyNowOrder = async (
  provider: Web3Provider,
  makerAddress: string,
  makerSwapAssets: UserFacingERC721AssetDataSerializedV4,
  takerSwapAssets: UserFacingERC20AssetDataSerializedV4,
  expiryDate: Date
): Promise<SignedERC721OrderStruct> => {
  const nftSwapSdk = initSwapSdk(provider)

  const order = nftSwapSdk.buildOrder(
    makerSwapAssets,
    takerSwapAssets,
    makerAddress,
    { expiry: expiryDate }
  )
  const signedOrder = await nftSwapSdk.signOrder(order)
  return signedOrder as SignedERC721OrderStruct
}

export const createBidOrder = async (
  provider: Web3Provider,
  makerAddress: string,
  makerSwapAssets: UserFacingERC20AssetDataSerializedV4,
  takerSwapAssets: UserFacingERC721AssetDataSerializedV4
): Promise<string> => {
  const nftSwapSdk = initSwapSdk(provider)
  const order = nftSwapSdk.buildOrder(
    makerSwapAssets,
    takerSwapAssets,
    makerAddress
  )
  const signedOrder = await nftSwapSdk.signOrder(order)
  return JSON.stringify(signedOrder)
}
// This function should be called following `approveAssetsForSwap` for the takers assets
export const fillBuyNowOrder = async (
  provider: Web3Provider,
  order: SignedERC721OrderStruct
) => {
  const nftSwapSdk = initSwapSdk(provider)
  const fillTransaction = await nftSwapSdk.fillSignedOrder(order)
  const fillReceipt = await nftSwapSdk.awaitTransactionHash(
    fillTransaction.hash
  )
  return fillReceipt
}

export const acceptBidOrder = async (
  provider: Web3Provider,
  order: SignedERC721OrderStruct
) => {
  const nftSwapSdk = initSwapSdk(provider)
  const fillTransaction = await nftSwapSdk.fillSignedOrder(order)
  const fillReceipt = await nftSwapSdk.awaitTransactionHash(
    fillTransaction.hash
  )
  return fillReceipt
}
