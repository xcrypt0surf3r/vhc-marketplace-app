/* eslint-disable no-console */
import { Web3Provider } from '@ethersproject/providers'
import {
  Fee,
  NftSwapV4,
  SignedERC721OrderStruct,
  SwappableAssetV4,
  UserFacingERC20AssetDataSerializedV4,
  UserFacingERC721AssetDataSerializedV4
} from '@traderxyz/nft-swap-sdk'
// import { BigNumber, FixedNumber } from 'ethers'
import { parseUnits } from 'ethers/lib/utils'

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

// Apply fees to erc20 payment, and return a Fee object for `buildOrder` and new amount post fees
export const applyFees = (erc20Amount: number, erc20Decimals: number) => {
  const feePercentage = process.env.REACT_APP_FEES_PERCENTAGE
  if (!feePercentage) {
    throw new Error(`Unable to retrieve fee percentage`)
  }
  const amountFees = erc20Amount * (+feePercentage / 100)
  const amountMinusFees = erc20Amount - amountFees

  const feeRecipient = process.env.REACT_APP_FEES_RECIPIENT
  if (!feeRecipient) {
    throw new Error(`Unable to retrieve fee recipient`)
  }

  // Convert to BigNumber so as that is what 0x order expects
  const feeAmountBN = parseUnits(amountFees.toString(), erc20Decimals)
  // Fee to be passed to buildOrder fees option
  const fee: Fee = {
    amount: feeAmountBN,
    recipient: feeRecipient,
    feeData: '0x' // empty fee data
  }

  const tokenAmountMinusFees = parseUnits(
    amountMinusFees.toString(),
    erc20Decimals
  )

  return {
    fee,
    tokenAmountMinusFees
  }
}

// This function should be called following `approveAssetsForSwap` for the makers assets
export const createBuyNowOrder = async (
  provider: Web3Provider,
  makerAddress: string,
  nftAddress: string,
  nftId: string,
  erc20Amount: number,
  erc20Info: { address: string; decimals: number },
  expiryDate: Date
): Promise<SignedERC721OrderStruct> => {
  const nftSwapSdk = initSwapSdk(provider)

  // Build makerSwapAssets
  const makerSwapAssets: UserFacingERC721AssetDataSerializedV4 = {
    tokenAddress: nftAddress,
    tokenId: nftId,
    type: 'ERC721'
  }

  const { tokenAmountMinusFees, fee } = applyFees(
    erc20Amount,
    erc20Info.decimals
  )

  // Build takerSwapAssets
  const takerSwapAssets: UserFacingERC20AssetDataSerializedV4 = {
    amount: tokenAmountMinusFees.toString(),
    tokenAddress: erc20Info.address,
    type: 'ERC20'
  }

  const order = nftSwapSdk.buildOrder(
    makerSwapAssets,
    takerSwapAssets,
    makerAddress,
    {
      expiry: expiryDate,
      fees: [fee]
    }
  )
  const signedOrder = await nftSwapSdk.signOrder(order)
  return signedOrder as SignedERC721OrderStruct
}

export const createBidOrder = async (
  provider: Web3Provider,
  makerAddress: string,
  nftAddress: string,
  nftId: string,
  erc20Amount: number,
  erc20Info: { address: string; decimals: number }
): Promise<string> => {
  const nftSwapSdk = initSwapSdk(provider)

  const { tokenAmountMinusFees, fee } = applyFees(
    erc20Amount,
    erc20Info.decimals
  )

  // Build makerSwapAssets
  const makerSwapAssets: UserFacingERC20AssetDataSerializedV4 = {
    amount: tokenAmountMinusFees.toString(),
    tokenAddress: erc20Info.address,
    type: 'ERC20'
  }

  const takerSwapAssets: UserFacingERC721AssetDataSerializedV4 = {
    tokenAddress: nftAddress,
    tokenId: nftId,
    type: 'ERC721'
  }

  const order = nftSwapSdk.buildOrder(
    makerSwapAssets,
    takerSwapAssets,
    makerAddress,
    {
      fees: [fee]
    }
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
