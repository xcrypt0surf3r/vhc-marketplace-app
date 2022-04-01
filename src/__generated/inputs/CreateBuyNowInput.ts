import { Currency } from '../enums'

/*
 * This input type is not interface, because interfaces
 * do not satisfy the constraint 'SerializableParam' of recoil
 */
export type CreateBuyNowInput = {
  readonly makerAddress: string
  readonly assetId: string
  readonly assetAddress: string
  readonly endDate: string
  readonly startDate: string
  readonly currency: Currency
  readonly value: number
  readonly order: string
}
