/*
 * This input type is not interface, because interfaces
 * do not satisfy the constraint 'SerializableParam' of recoil
 */
export type CreateBuyNowInput = {
  readonly order: string
  readonly assetId: string
  readonly assetAddress: string
}
