import { CheckCircleIcon } from '@heroicons/react/solid'
import { useNavigate } from 'react-router-dom'
import { useWeb3React } from '@web3-react/core'
import { useAtom } from 'jotai'
import { UserFacingERC721AssetDataSerializedV4 } from '@traderxyz/nft-swap-sdk'
import { useState } from 'react'
import { Button, ButtonColors, ButtonSizes } from '../../shared/Button'
import { buyNowAtom } from '../../../state/atoms/listing.atoms'
import {
  approveAssetsForSwap,
  createBuyNowOrder
} from '../../../services/order'
import { getERC20TokenInfo } from '../../../utils'
import { useCreateBuyNowMutation } from '../../../services/assets'
import { CreateBuyNowInput } from '../../../__generated/inputs'
import { useWeb3Provider } from '../../../hooks/web3Provider'
import { ErrorProps, Exception } from '../../shared/ErrorHandler'
import { useModal } from '../../../hooks/use-modal'
import SellAssetSubmitted from './SellAssetSubmitted'
import ModalContainer, { ModalSizes } from '../../shared/layout/ModalContainer'

const ConfirmSell = () => {
  const { account } = useWeb3React()
  const [buyNow] = useAtom(buyNowAtom)
  const [, setReportError] = useState({
    visible: false,
    message: ''
  } as ErrorProps)
  const [isSellApproved, setIsSellApproved] = useState(false)
  const [isSellSigned, setIsSellSigned] = useState(false)
  const [isConfirming, setIsConfirming] = useState(false)
  const [createBuyNowMutation] = useCreateBuyNowMutation()
  const provider = useWeb3Provider()
  const { openModal, freezeModal, unfreezeModal } = useModal()
  const navigate = useNavigate()

  const handleSellApproved = async () => {
    if (!account || !buyNow) return
    freezeModal()
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
        setReportError({
          visible: true,
          message: 'Sale request rejected'
        })
      }
      unfreezeModal()
    } catch (exception) {
      setIsSellApproved(false)
      const exceptionObj = exception as Exception
      setReportError({
        visible: true,
        message: exceptionObj.message
      })
    }
  }

  const handleError = (message: string) => {
    setReportError({
      visible: true,
      message
    })
    setIsConfirming(false)
  }

  const handleSignAndCreateBuyNow = async () => {
    freezeModal()
    // Do not allow to reconfirm when tx is confirming.
    if (isConfirming) return
    if (!account) return
    if (buyNow && buyNow.tokenAddress && buyNow.assetId) {
      setIsConfirming(true)
      try {
        const erc20Info = getERC20TokenInfo(buyNow.currency)
        if (!erc20Info) return

        const signedOrder = await createBuyNowOrder(
          await provider,
          account,
          buyNow.tokenAddress,
          buyNow.assetId,
          buyNow.price,
          erc20Info,
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

        const buyNowResponse = await createBuyNowMutation(data)

        if ('error' in buyNowResponse) {
          handleError('Error while processing the asset for sale')
          return
        }

        setIsSellSigned(true)
        setIsConfirming(false)
        openModal('', <SellAssetSubmitted />)
        navigate(`/asset-details/${buyNow.assetId}`, {
          replace: true
        })
      } catch (exception) {
        unfreezeModal()
        const exceptionObj = exception as Exception
        handleError(exceptionObj.message)
      }
    }
  }

  return (
    <ModalContainer size={ModalSizes.LARGE}>
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
                    sizer={ButtonSizes.MEDIUM}
                    color={ButtonColors.PRIMARY}
                    onClick={handleSignAndCreateBuyNow}
                    isDisabled={isConfirming}
                  >
                    {isConfirming ? 'Signing...' : 'Sign'}
                  </Button>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </ModalContainer>
  )
}

export default ConfirmSell
