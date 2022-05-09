/* eslint-disable no-console */
import { CheckCircleIcon } from '@heroicons/react/solid'
import {
  SwappableAssetV4,
  UserFacingERC20AssetDataSerializedV4,
  UserFacingERC721AssetDataSerializedV4
} from '@traderxyz/nft-swap-sdk'
import { useWeb3React } from '@web3-react/core'
import { ethers } from 'ethers'
import { useAtom } from 'jotai'
import { useEffect, useState } from 'react'
import { useModal } from '../../../hooks/use-modal'
import { useFillBuyNowMutation } from '../../../services/assets'
import { approveAssetsForSwap, fillBuyNowOrder } from '../../../services/order'
import { listingAtom } from '../../../state/atoms/listing.atoms'
import { Button, ButtonColors, ButtonSizes } from '../../shared/Button'
import ModalContainer from '../../shared/layout/ModalContainer'
import OrderConfirmed from './OrderConfirmed'

const SubmitOrder = () => {
  const [unlocking, setUnlocking] = useState(false)
  const { account, connector } = useWeb3React()
  const [listing] = useAtom(listingAtom)
  const [isApproved, setIsApproved] = useState(false)
  const [isConfirming, setIsConfirming] = useState(false)
  const [isSigned, setIsSigned] = useState(false)
  const [makerSwapAsset, setMakerSwapAsset] = useState<
    SwappableAssetV4 | UserFacingERC20AssetDataSerializedV4 | undefined
  >()
  const { openModal, freezeModal, unfreezeModal } = useModal()

  const [fillBuyNowMutation] = useFillBuyNowMutation()

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
    if (isSigned && isApproved) {
      setIsConfirming(false)
      openModal('Order Confirmed', <OrderConfirmed />)
    }
  }, [isApproved, isSigned, openModal])

  const handleBuyNowUnlock = async () => {
    freezeModal()
    setUnlocking(true)
    if (!listing?.buyNow || !account) return

    // Set makerAsset for approval useEffect
    const makerAsset: UserFacingERC721AssetDataSerializedV4 = {
      type: 'ERC721',
      tokenAddress: listing.assetAddress,
      tokenId: listing.assetId
    }
    setMakerSwapAsset(makerAsset)
    unfreezeModal()
  }

  const handleConfirmBuyNow = async () => {
    // Do not allow to reconfirm when tx is confirming.
    if (isConfirming) return

    freezeModal()

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
      unfreezeModal()
    }
  }

  return (
    <ModalContainer>
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
                onClick={handleBuyNowUnlock}
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
                onClick={handleConfirmBuyNow}
                disabled={isConfirming}
              >
                {isConfirming ? 'Signing...' : 'Sign'}
              </Button>
            ) : null}
          </div>
        </div>
      </div>
    </ModalContainer>
  )
}

export default SubmitOrder
