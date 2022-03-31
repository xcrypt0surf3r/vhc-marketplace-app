import { Currency } from '../enums'

/*
 * This input type is not interface, because interfaces
 * do not satisfy the constraint 'SerializableParam' of recoil
 */
export type PriceInput = {
  readonly currency: Currency
  readonly value: number
}
