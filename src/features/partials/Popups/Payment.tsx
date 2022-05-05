/* eslint-disable no-console */
import { CheckCircleIcon } from '@heroicons/react/solid'
import {
  SwappableAssetV4,
  UserFacingERC20AssetDataSerializedV4,
  UserFacingERC721AssetDataSerializedV4
} from '@traderxyz/nft-swap-sdk'
import { useWeb3React } from '@web3-react/core'
import { ethers } from 'ethers'
import { parseUnits } from 'ethers/lib/utils'
import { useAtom } from 'jotai'
import { useEffect, useState } from 'react'
import { useFillBuyNowMutation } from '../../../services/assets'
import { useCreateBidMutation } from '../../../services/bid'
import {
  approveAssetsForSwap,
  createBidOrder,
  fillBuyNowOrder
} from '../../../services/order'
import { useAppDispatch, useAppSelector } from '../../../state'
import { createBidAtom } from '../../../state/atoms/bid.atom'
import { listingAtom } from '../../../state/atoms/listing.atoms'
import { getPopup, openModal, Popup } from '../../../state/popup.slice'
import { getERC20TokenAddress, getERC20TokenDecimals } from '../../../utils'
import { Button, ButtonColors, ButtonSizes } from '../../shared/Button'
import { Modal } from '../../shared/Modal'

const Payment = () => {
  const [unlocking, setUnlocking] = useState(false)
  const { account, connector } = useWeb3React()
  const [listing] = useAtom(listingAtom)
  const [bid] = useAtom(createBidAtom)

  const [isApproved, setIsApproved] = useState(false)
  const [isConfirming, setIsConfirming] = useState(false)
  const [isSigned, setIsSigned] = useState(false)
  const [makerSwapAsset, setMakerSwapAsset] = useState<
    SwappableAssetV4 | UserFacingERC20AssetDataSerializedV4 | undefined
  >()
  const [takerSwapAsset, setTakerSwapAsset] = useState<
    SwappableAssetV4 | UserFacingERC721AssetDataSerializedV4 | undefined
  >()

  const [fillBuyNowMutation] = useFillBuyNowMutation()
  const [createBid, { isSuccess, isError }] = useCreateBidMutation()
  const dispatch = useAppDispatch()
  const popups = useAppSelector(getPopup)

  /**
   * There is only one payment modal for BUY_NOW flow and AUCTION flow,
   * this function help to determine which one it is then show the appropriate
   * confirmation modal which is either ORDER_CONFIRMED or BID_SUBMITTED.
   * ORDER_CONFIRMED is the default nextModal
   */

  useEffect(() => {
    if (makerSwapAsset && account) {
      ;(async () => {
        const provider = new ethers.providers.Web3Provider(
          await connector?.getProvider()
        )
        const { approved } = await approveAssetsForSwap(
          provider,
          account,
          makerSwapAsset
        )
        setIsApproved(approved)
        setUnlocking(false)
      })()
    }
  }, [makerSwapAsset, account, connector])

  useEffect(() => {
    if (isSigned && isApproved && isSuccess) {
      setIsConfirming(false)
      if (popups.modal.at(-2) === Popup.PLACE_BID) {
        dispatch(openModal(Popup.BID_SUBMITTED))
      } else {
        dispatch(openModal(Popup.ORDER_CONFIRMED))
      }
    }

    if (isError) dispatch(openModal(Popup.BUY_BID_ERROR))
  }, [isApproved, isSigned, dispatch, popups.modal, isSuccess, isError])

  const handleBuyNowUnlock = async () => {
    setUnlocking(true)
    if (!listing?.buyNow || !account) return

    const amount = listing.buyNow.price.value.toString()
    const { currency } = listing.buyNow.price

    const currencyAddress = getERC20TokenAddress(currency)
    if (!currencyAddress) return

    const makerAsset: UserFacingERC721AssetDataSerializedV4 = {
      type: 'ERC721',
      tokenAddress: listing.assetAddress,
      tokenId: listing.assetId
    }
    setMakerSwapAsset(makerAsset)

    const takerAsset: UserFacingERC20AssetDataSerializedV4 = {
      type: 'ERC20',
      tokenAddress: currencyAddress,
      amount
    }
    setTakerSwapAsset(takerAsset)
  }

  const handleBidUnlock = async () => {
    setUnlocking(true)
    if (!listing?.auction || !account) return

    const { value, currency } = bid

    const currencyAddress = getERC20TokenAddress(currency)
    if (!currencyAddress) return

    const decimals = getERC20TokenDecimals(currency)
    // Get BN value of ERC20 amount for on-chain 0x order
    const amountBigNumber = parseUnits(value.toString(), decimals)

    const takerAsset: UserFacingERC721AssetDataSerializedV4 = {
      type: 'ERC721',
      tokenAddress: listing.assetAddress,
      tokenId: listing.assetId
    }
    setTakerSwapAsset(takerAsset)

    const makerAsset: UserFacingERC20AssetDataSerializedV4 = {
      type: 'ERC20',
      tokenAddress: currencyAddress,
      amount: amountBigNumber.toString()
    }

    setMakerSwapAsset(makerAsset)
  }

  const handleConfirmBuyNow = async () => {
    // Do not allow to reconfirm when tx is confirming.
    if (isConfirming) return

    const provider = new ethers.providers.Web3Provider(
      await connector?.getProvider()
    )

    if (!account) return

    if (listing?.buyNow?.order) {
      const order = JSON.parse(listing?.buyNow?.order)
      setIsConfirming(true)
      const txReceipt = await fillBuyNowOrder(provider, order)

      await fillBuyNowMutation({
        assetAddress: listing.assetAddress,
        assetId: listing.assetId,
        txReceipt: JSON.stringify(txReceipt),
        txHash: txReceipt.transactionHash,
        makerAddress: listing.makerAddress,
        takerAddress: account
      })
      setIsConfirming(false)
      setIsSigned(true)
    }
  }

  const handleConfirmBid = async () => {
    try {
      const provider = new ethers.providers.Web3Provider(
        await connector?.getProvider()
      )

      if (!account) return

      if (listing?.auction) {
        setIsConfirming(true)

        const order = await createBidOrder(
          provider,
          account,
          makerSwapAsset as UserFacingERC20AssetDataSerializedV4,
          takerSwapAsset as UserFacingERC721AssetDataSerializedV4
        )

        await createBid({
          order,
          owner: account,
          listingId: listing.id,
          amount: {
            currency: 'VHC',
            value: +bid.value
          }
        })
        setIsConfirming(false)
        setIsSigned(true)
      }
    } catch (err) {
      setIsConfirming(false)
    }
  }

  return (
    <Modal heading='Place a bid' align='center' className='max-w-[32rem]'>
      <div className='grid grid-cols-1 divide-y gap-6'>
        <div className='flex gap-x-6'>
          {!isApproved ? (
            <span className='text-xs bg-slate-200 text-indigo-300 rounded-full h-6 w-6 shrink-0 flex items-center justify-center'>
              1
            </span>
          ) : (
            <CheckCircleIcon className='h-6 w-6 shrink-0 text-blue-700' />
          )}
          <div className='flex flex-col gap-y-5'>
            <span className='font-medium'>Approve currency</span>
            <span className='text-sm text-gray-600'>
              Submit a transaction with your wallet to trade with this currency.
              This only needs to be done once.
            </span>
            {!isApproved && (
              <Button
                sizer={ButtonSizes.SMALL}
                color={ButtonColors.SECONDARY}
                className='rounded-xl'
                onClick={listing?.buyNow ? handleBuyNowUnlock : handleBidUnlock}
              >
                {unlocking ? 'Unlocking...' : 'Unlock'}
              </Button>
            )}
          </div>
        </div>
        <div className='flex gap-x-6 pt-6'>
          {!isSigned ? (
            <span className='text-xs bg-slate-200 text-indigo-300 rounded-full h-6 w-6 shrink-0 flex items-center justify-center'>
              2
            </span>
          ) : (
            <CheckCircleIcon className='h-6 w-6 shrink-0 text-blue-700' />
          )}
          <div className='flex flex-col gap-y-5'>
            <span className='font-medium'>Sign message</span>
            <span className='text-sm text-gray-600'>
              Sign a message using your wallet to continue
            </span>
            {isApproved &&
            !isSigned &&
            (listing?.buyNow || listing?.auction) ? (
              <Button
                sizer={ButtonSizes.SMALL}
                color={ButtonColors.SECONDARY}
                className='rounded-xl'
                onClick={
                  listing.buyNow ? handleConfirmBuyNow : handleConfirmBid
                }
                disabled={isConfirming}
              >
                {isConfirming ? 'Signing...' : 'Sign'}
              </Button>
            ) : null}
          </div>
        </div>
      </div>
    </Modal>
  )
}

export default Payment
