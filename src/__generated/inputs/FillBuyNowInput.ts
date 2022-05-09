/*
 * This input type is not interface, because interfaces
 * do not satisfy the constraint 'SerializableParam' of recoil
 */
export type FillBuyNowInput = {
  readonly listingId: string
  readonly txReceipt: string
  readonly txHash: string
  readonly makerAddress: string
  readonly takerAddress: string
}
