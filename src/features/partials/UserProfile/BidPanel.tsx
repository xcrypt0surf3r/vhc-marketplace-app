import { useWeb3React } from '@web3-react/core'
import _ from 'lodash'
import { useAtom } from 'jotai'
import { Bid } from '../../../services/queries'
import { classNames, getOrder, truncate } from '../../../utils'
import currencyIcon from '../../../assets/images/icons/currency.svg'
import { useAppDispatch } from '../../../state'
import { openModal, Popup } from '../../../state/popup.slice'
import { bidAtom } from '../../../state/atoms/bid.atom'

const BidsPanel = ({ data }: { data: Bid[] }) => {
  const { account } = useWeb3React()
  const dispatch = useAppDispatch()
  const [, setBid] = useAtom(bidAtom)

  const cancelBid = (bid: Bid) => {
    setBid(bid)
    dispatch(openModal(Popup.CANCEL_BID))
  }

  const bids = data.map((bid) => ({
    assetName: bid.assetName,
    price: `${bid.amount.value} $${bid.amount.currency}`,
    seller: getOrder(bid).maker,
    activeUntil: new Date(bid.activeUntil).toUTCString(),
    action:
      bid.owner === account && bid.status === 'ACTIVE' ? (
        <button
          className='text-red-500 hover:cursor-pointer hover:underline'
          onClick={() => cancelBid(bid)}
        >
          Cancel Bid
        </button>
      ) : (
        '-'
      ),
    status: bid.status
  }))

  return (
    <table className='w-full table-fixed'>
      <thead className='border-b border-gray-300 p-4'>
        <tr>
          <th className='w-11 p-4 font-normal text-left'>#</th>
          {Object.keys(bids[0]).map((value, index) => (
            <th
              key={index}
              className={classNames(
                'capitalize text-gray-600 font-normal text-left pr-4 py-4',
                value === 'status' || value === 'action' ? 'w-32' : ''
              )}
            >
              {_.startCase(value)}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {bids.map((bid, index) => (
          <tr key={index} className='border-b border-gray-300'>
            <td className='px-4'>{index + 1}</td>
            <td className='py-6 pr-4'>{bid.assetName}</td>
            <td className=''>
              <div className='flex gap-2 items-center'>
                <img
                  src={currencyIcon}
                  alt={'currency icon'}
                  className='w-7 h-7 rounded-full'
                />
                <span>{bid.price}</span>
              </div>
            </td>
            <td className='text-blue-700 underline'>
              {truncate(bid.seller, 8)}
            </td>
            <td className='pr-8'>{bid.activeUntil ?? '-'}</td>
            <td>{bid.action}</td>
            <td>
              <span className={classNames(bid.status)}>
                {_.capitalize(bid.status)}
              </span>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export default BidsPanel
