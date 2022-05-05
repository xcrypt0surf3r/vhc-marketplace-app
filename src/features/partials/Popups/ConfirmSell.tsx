import { CheckCircleIcon } from '@heroicons/react/outline'
import { useWeb3React } from '@web3-react/core'
import { useAtom } from 'jotai'
import {
  UserFacingERC20AssetDataSerializedV4,
  UserFacingERC721AssetDataSerializedV4
} from '@traderxyz/nft-swap-sdk'
import { useState } from 'react'
import { useAppDispatch } from '../../../state'
import { openModal, Popup } from '../../../state/popup.slice'
import { Button, ButtonColors, ButtonSizes } from '../../shared/Button'
import { Modal } from '../../shared/Modal'
import { buyNowAtom } from '../../../state/atoms/listing.atoms'
import {
  approveAssetsForSwap,
  createBuyNowOrder
} from '../../../services/order'
import { getERC20TokenAddress, getERC20TokenDecimals } from '../../../utils'
import { useCreateBuyNowMutation } from '../../../services/assets'
import { CreateBuyNowInput } from '../../../__generated/inputs'
import { useWeb3Provider } from '../../../hooks/web3Provider'

const ConfirmSell = () => {
  const { account } = useWeb3React()
  const [buyNow] = useAtom(buyNowAtom)
  const [errorMessage, setErrorMessage] = useState(false)
  const [isSellApproved, setIsSellApproved] = useState(false)
  const [isSellSigned, setIsSellSigned] = useState(false)
  const [isConfirming, setIsConfirming] = useState(false)
  const [createBuyNowMutation] = useCreateBuyNowMutation()
  const provider = useWeb3Provider()

  const handleSellApproved = async () => {
    if (!account || !buyNow) return
    try {
      setIsConfirming(true)
      const swapAssets: UserFacingERC721AssetDataSerializedV4 = {
        type: 'ERC721',
        tokenAddress: buyNow.tokenAddress,
        tokenId: buyNow.assetId
      }
      const { approved } = await approveAssetsForSwap(
        await provider,
        account,
        swapAssets
      )
      setIsConfirming(false)
      setIsSellApproved(approved)
      if (!approved) {
        setErrorMessage(true)
      }
    } catch {
      setIsConfirming(false)
      setIsSellApproved(false)
      setErrorMessage(true)
    }
  }

  const dispatch = useAppDispatch()

  const handleError = () => {
    setErrorMessage(true)
    setIsConfirming(false)
  }

  const handleSignAndCreateBuyNow = async () => {
    // Do not allow to reconfirm when tx is confirming.
    if (isConfirming) return
    if (!account) return
    if (buyNow && buyNow.tokenAddress && buyNow.assetId) {
      setIsConfirming(true)

      try {
        const currencyAddress = getERC20TokenAddress(buyNow.currency)
        if (!currencyAddress) return

        const decimals = getERC20TokenDecimals(buyNow.currency)
        // Amount with correct decimals is required 0x order (VHC has 18 decimals)
        const tokenAmountForOrder = buyNow.price * 10 ** decimals

        const makerAssets: UserFacingERC721AssetDataSerializedV4 = {
          tokenAddress: buyNow.tokenAddress,
          tokenId: buyNow.assetId,
          type: 'ERC721'
        }

        const takerAddress: UserFacingERC20AssetDataSerializedV4 = {
          amount: tokenAmountForOrder.toString(),
          tokenAddress: currencyAddress,
          type: 'ERC20'
        }
        const signedOrder = await createBuyNowOrder(
          await provider,
          account,
          makerAssets,
          takerAddress,
          buyNow.endDate
        )
        const data: CreateBuyNowInput = {
          assetAddress: buyNow.tokenAddress,
          assetId: buyNow.assetId,
          currency: buyNow.currency,
          endDate: buyNow.endDate.toUTCString(),
          makerAddress: account,
          order: JSON.stringify(signedOrder),
          startDate: new Date().toUTCString(),
          value: buyNow.price
        }

        await createBuyNowMutation(data)
        setIsSellSigned(true)
        setIsConfirming(false)
        dispatch(openModal(Popup.SELL_ASSET_SUBMITTED))
      } catch (err) {
        // eslint-disable-next-line no-console
        console.error(err)
        handleError()
      }
    }
  }

  return (
    <Modal
      heading='Complete listing'
      align='center'
      className='max-w-[40rem]'
      freeze={isConfirming}
    >
      <div className='grid grid-cols-1 divide-y'>
        <div className='flex items-center gap-32 py-5'>
          <div className='flex gap-4 items-center'>
            <div className='bg-black h-[58px] w-[58px] rounded-xl'>
              <img src='' alt='' />
            </div>
            <div className='flex flex-col gap-1'>
              <span className='font-medium'>{'AssetName'}</span>
              <span className='text-gray-500 text-sm'>Quantity: {'1'}</span>
            </div>
          </div>
          <div className='flex flex-col items-end'>
            <span className='text-gray-500'>Price</span>
            <span className='text-lg'>
              ${buyNow?.currency} {buyNow?.price}
            </span>
          </div>
        </div>

        {!isSellSigned && (
          <div className='grid grid-cols-1 divide-y gap-6'>
            <div className='flex gap-x-6 mt-8'>
              {!isSellApproved ? (
                <span className='text-xs bg-slate-200 text-indigo-300 rounded-full h-6 w-6 shrink-0 flex items-center justify-center'>
                  1
                </span>
              ) : (
                <CheckCircleIcon className='h-6 w-6 shrink-0 text-blue-700' />
              )}
              <div className='flex flex-col gap-y-5'>
                <span className='font-medium'>
                  Unlock selling functionality
                </span>
                <span className='text-sm text-gray-600'>
                  Please make sure your wallet is on the Polygon network
                </span>
                {!isSellApproved && (
                  <Button
                    sizer={ButtonSizes.MEDIUM}
                    color={ButtonColors.PRIMARY}
                    className='rounded-xl'
                    onClick={handleSellApproved}
                    isDisabled={isConfirming || !account || !buyNow}
                  >
                    {isConfirming ? 'Approving...' : 'Approve'}
                  </Button>
                )}
              </div>
            </div>
            <div className='flex gap-x-6 pt-6'>
              {!isSellSigned ? (
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
                {isSellApproved && !isSellSigned && (
                  <Button
                    sizer={ButtonSizes.SMALL}
                    color={ButtonColors.PRIMARY}
                    className='rounded-xl'
                    onClick={handleSignAndCreateBuyNow}
                    isDisabled={isConfirming}
                  >
                    {isConfirming ? 'Signing...' : 'Sign'}
                  </Button>
                )}
              </div>
            </div>
            {errorMessage ? (
              <div className='text-red-700 mt-2 text-lg'>
                Sorry, something went wrong.
              </div>
            ) : null}
          </div>
        )}
      </div>
    </Modal>
  )
}

export default ConfirmSell
