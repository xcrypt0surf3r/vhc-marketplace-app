/* eslint-disable no-console */
import { CheckCircleIcon } from '@heroicons/react/solid'
import {
  SwappableAssetV4,
  UserFacingERC20AssetDataSerializedV4
} from '@traderxyz/nft-swap-sdk'
import { useWeb3React } from '@web3-react/core'
import { ethers } from 'ethers'
import { parseUnits } from 'ethers/lib/utils'
import { useAtom } from 'jotai'
import { useEffect, useState } from 'react'
import { useModal } from '../../../hooks/use-modal'
import { useCreateBidMutation } from '../../../services/bid'
import { approveAssetsForSwap, createBidOrder } from '../../../services/order'
import { createBidAtom } from '../../../state/atoms/bid.atom'
import { listingAtom } from '../../../state/atoms/listing.atoms'
import {
  getERC20TokenAddress,
  getERC20TokenDecimals,
  getERC20TokenInfo
} from '../../../utils'
import { Button, ButtonColors, ButtonSizes } from '../../shared/Button'
import ModalContainer from '../../shared/layout/ModalContainer'
import BidSubmitted from './BidSubmitted'
import BuyBidError from './BuyBidError'

const SubmitBid = () => {
  const [unlocking, setUnlocking] = useState(false)
  const { account, connector } = useWeb3React()
  const [listing] = useAtom(listingAtom)
  const [bid] = useAtom(createBidAtom)
  const { openModal, freezeModal, unfreezeModal } = useModal()

  const [isApproved, setIsApproved] = useState(false)
  const [isConfirming, setIsConfirming] = useState(false)
  const [isSigned, setIsSigned] = useState(false)
  const [makerSwapAsset, setMakerSwapAsset] = useState<
    SwappableAssetV4 | UserFacingERC20AssetDataSerializedV4 | undefined
  >()

  const [createBid, { isSuccess, error }] = useCreateBidMutation()

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
      openModal('', <BidSubmitted />)
    }

    if (error) {
      const message = typeof error === 'string' ? error : undefined // (error as Error).message
      openModal('', <BuyBidError error={message} />)
    }
  }, [isApproved, isSigned, isSuccess, error, openModal])

  const handleBidUnlock = async () => {
    freezeModal()
    setUnlocking(true)
    if (!listing?.auction || !account) return

    const { value, currency } = bid

    const currencyAddress = getERC20TokenAddress(currency)
    if (!currencyAddress) return

    const decimals = getERC20TokenDecimals(currency)
    // Get BN value of ERC20 amount for on-chain 0x order
    const amountBigNumber = parseUnits(value.toString(), decimals)

    // Set makerAsset for approval useEffect
    const makerAsset: UserFacingERC20AssetDataSerializedV4 = {
      type: 'ERC20',
      tokenAddress: currencyAddress,
      amount: amountBigNumber.toString()
    }
    setMakerSwapAsset(makerAsset)
    unfreezeModal()
  }

  const handleConfirmBid = async () => {
    freezeModal()
    try {
      const provider = new ethers.providers.Web3Provider(
        await connector?.getProvider()
      )

      const { value, currency } = bid
      const erc20Info = getERC20TokenInfo(currency)
      if (!erc20Info || !account) return

      if (listing?.auction) {
        setIsConfirming(true)

        const order = await createBidOrder(
          provider,
          account,
          listing.assetAddress,
          listing.assetId,
          value,
          erc20Info
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
      if ((err as any).code === 4001) {
        unfreezeModal()
      }
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
                sizer={ButtonSizes.MEDIUM}
                color={ButtonColors.SECONDARY}
                onClick={handleBidUnlock}
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
                sizer={ButtonSizes.MEDIUM}
                color={ButtonColors.SECONDARY}
                onClick={handleConfirmBid}
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

export default SubmitBid
