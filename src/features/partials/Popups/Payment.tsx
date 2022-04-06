import { CheckCircleIcon } from '@heroicons/react/solid'
import { UserFacingERC20AssetDataSerializedV4 } from '@traderxyz/nft-swap-sdk'
import { useWeb3React } from '@web3-react/core'
import { ethers } from 'ethers'
import { useAtom } from 'jotai'
import { useState } from 'react'
import { useFillBuyNowMutation } from '../../../services/assets'
import { approveAssetsForSwap, fillBuyNowOrder } from '../../../services/order'
import { useAppDispatch, useAppSelector } from '../../../state'
import { listingAtom } from '../../../state/atoms/listing.atoms'
import { getPopup, openModal, Popup } from '../../../state/popup.slice'
import { getERC20TokenAddress } from '../../../utils'
import { Button, ButtonColors, ButtonSizes } from '../../shared/Button'
import { Modal } from '../../shared/Modal'

const Payment = () => {
  const { account, connector } = useWeb3React()
  const [listing] = useAtom(listingAtom)

  const [isApproved, setIsApproved] = useState(false)
  const [isConfirming, setIsConfirming] = useState(false)
  const [isSigned, setIsSigned] = useState(false)

  const [fillBuyNowMutation] = useFillBuyNowMutation()

  const dispatch = useAppDispatch()
  const popups = useAppSelector(getPopup)

  /**
   * There is only one payment modal for BUY_NOW flow and AUCTION flow,
   * this function help to determine which one it is then show the appropriate
   * confirmation modal which is either ORDER_CONFIRMED or BID_SUBMITTED.
   * ORDER_CONFIRMED is the default nextModal
   */
  const handleSubmit = () => {
    let nextModal = Popup.ORDER_CONFIRMED

    if (popups.modal.at(-2) === Popup.PLACE_BID) {
      nextModal = Popup.BID_SUBMITTED
    }
    dispatch(openModal(nextModal))
  }

  const handleUnlock = async () => {
    const provider = new ethers.providers.Web3Provider(
      await connector?.getProvider()
    )
    if (!listing?.buyNow || !account) return

    const currencyAddress = getERC20TokenAddress(listing.buyNow.price.currency)
    if (!currencyAddress) return

    const swapAssets: UserFacingERC20AssetDataSerializedV4 = {
      type: 'ERC20',
      tokenAddress: currencyAddress,
      amount: listing.buyNow.price.value.toString()
    }
    const { approved } = await approveAssetsForSwap(
      provider,
      account,
      swapAssets
    )
    setIsApproved(approved)
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

  return (
    <Modal heading='Payment' align='center' className='max-w-[32rem]'>
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
                color={ButtonColors.PRIMARY}
                className='rounded-xl'
                onClick={handleUnlock}
              >
                Unlock
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
            {isApproved && !isSigned && (
              <Button
                sizer={ButtonSizes.SMALL}
                color={ButtonColors.PRIMARY}
                className='rounded-xl'
                onClick={handleConfirmBuyNow}
                isLoading={isConfirming}
              >
                Sign
              </Button>
            )}
          </div>
        </div>
        {isApproved && isSigned && (
          <div className='pt-5'>
            <Button
              color={ButtonColors.PRIMARY}
              sizer={ButtonSizes.FULL}
              className='rounded-xl'
              onClick={handleSubmit}
            >
              Finish
            </Button>
          </div>
        )}
      </div>
    </Modal>
  )
}

export default Payment
