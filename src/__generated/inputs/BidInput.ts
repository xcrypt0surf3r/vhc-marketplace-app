import { PriceInput } from '.'

/*
 * This input type is not interface, because interfaces
 * do not satisfy the constraint 'SerializableParam' of recoil
 */
export type BidInput = {
  readonly listingId: string
  readonly owner: string
  readonly order: string
  readonly amount: PriceInput
  readonly feeAmount: PriceInput
}
