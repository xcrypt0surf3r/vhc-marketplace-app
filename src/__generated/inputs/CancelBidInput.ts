/*
 * This input type is not interface, because interfaces
 * do not satisfy the constraint 'SerializableParam' of recoil
 */
export type CancelBidInput = {
  readonly listingId: string
  readonly bidId: string
}
