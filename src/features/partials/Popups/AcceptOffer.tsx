import { useAtom } from 'jotai'
import { useState } from 'react'
import { ethers } from 'ethers'
import * as _ from 'lodash'
import {
  SignedERC721OrderStruct,
  UserFacingERC721AssetDataSerializedV4
} from '@traderxyz/nft-swap-sdk'
import { useWeb3React } from '@web3-react/core'
import { useAppDispatch } from '../../../state'
import { bidAtom } from '../../../state/atoms/bid.atom'
import { listingAtom } from '../../../state/atoms/listing.atoms'
import { openModal } from '../../../state/popup.slice'
import { classNames, getOrder, isDateElapsed, truncate } from '../../../utils'
import { Button, ButtonColors, ButtonSizes } from '../../shared/Button'
import { Modal } from '../../shared/Modal'
import { useAcceptBidMutation } from '../../../services/bid'
import { acceptBidOrder, approveAssetsForSwap } from '../../../services/order'

export interface IBuyNow {
  [key: string]: string | number
}

const AcceptOffer = () => {
  const [isAccepting, setIsAccepting] = useState(false)
  const [bid] = useAtom(bidAtom)
  const [listing] = useAtom(listingAtom)
  const [acceptBid] = useAcceptBidMutation()
  const { account, connector } = useWeb3React()

  const data: IBuyNow = {
    assetName: bid?.assetName ?? '',
    assetPrice: `${listing?.auction?.startingPrice.currency} ${listing?.auction?.startingPrice.value}`,
    offerValue: `${bid?.amount.currency} ${bid?.amount.value}`,
    buyer: bid?.owner ? truncate(bid?.owner, 6) : ''
  }

  const dispatch = useAppDispatch()

  const handleSubmit = async () => {
    setIsAccepting(true)
    try {
      if (account && listing && bid?.order) {
        // check if auction has ended
        if (!isDateElapsed(listing.auction?.endDate!))
          throw Error('Auction has not ended')

        const provider = new ethers.providers.Web3Provider(
          await connector?.getProvider()
        )

        const makerAsset: UserFacingERC721AssetDataSerializedV4 = {
          type: 'ERC721',
          tokenAddress: listing.assetAddress,
          tokenId: listing.assetId
        }

        const { approved } = await approveAssetsForSwap(
          provider,
          account,
          makerAsset
        )

        if (!approved) throw Error('Approval required')

        const txReceipt = await acceptBidOrder(
          provider,
          getOrder(bid) as SignedERC721OrderStruct
        )

        await acceptBid({
          bidId: bid?.id,
          listingId: listing?.id,
          txHash: txReceipt.transactionHash,
          txReceipt: JSON.stringify(txReceipt)
        })
        setIsAccepting(false)
        // dispatch success modal
        dispatch(openModal(''))
      }
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log('error', error)
      setIsAccepting(false)
      // dispatch error modal
      dispatch(openModal(''))
    }
  }
  return (
    <Modal heading='Accept Offer' align='center' className='w-[30rem]'>
      <table className='table-fixed'>
        <tbody>
          {Object.keys(data).map((key) => (
            <tr key={key}>
              <td className='text-gray-700 w-[12rem] py-3'>
                {_.startCase(key)}
              </td>
              <td
                className={classNames(
                  key === 'Collection name' ? ' text-blue-600' : ''
                )}
              >
                {data[key]}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Button
        magnify
        color={ButtonColors.SECONDARY}
        disabled={isAccepting}
        isDisabled={isAccepting}
        sizer={ButtonSizes.FULL}
        onClick={handleSubmit}
        className='rounded-xl disabled:opacity-50 disabled:cursor-not-allowed mt-5'
      >
        {isAccepting ? 'Confirming...' : 'Confirm'}
      </Button>
    </Modal>
  )
}

export default AcceptOffer