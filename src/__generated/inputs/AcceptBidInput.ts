/*
 * This input type is not interface, because interfaces
 * do not satisfy the constraint 'SerializableParam' of recoil
 */
export type AcceptBidInput = {
  readonly listingId: string
  readonly bidId: string
  readonly txHash: string
  readonly txReceipt: string
}
