import { PriceInput } from '.'
import { AuctionType } from '../enums'

/*
 * This input type is not interface, because interfaces
 * do not satisfy the constraint 'SerializableParam' of recoil
 */
export type AuctionInput = {
  readonly assetId: string
  readonly assetAddress: string
  readonly startDate: string
  readonly endDate: string
  readonly startingPrice: PriceInput
  readonly reservePrice?: PriceInput
  readonly type: AuctionType
}
