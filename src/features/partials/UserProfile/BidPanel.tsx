import { useWeb3React } from '@web3-react/core'
import _ from 'lodash'
import { useNavigate } from 'react-router-dom'
import { useAtom } from 'jotai'
import { useEffect, useState } from 'react'
import { Bid } from '../../../services/queries'
import { classNames, formatDate, getOrder, truncate } from '../../../utils'
import currencyIcon from '../../../assets/images/icons/currency.svg'
import { useAppDispatch } from '../../../state'
import { openModal, Popup } from '../../../state/popup.slice'
import { bidAtom } from '../../../state/atoms/bid.atom'
import { listingAtom } from '../../../state/atoms/listing.atoms'
import SortBy, { OrderProps } from '../../shared/SortBy'

type Prop = {
  data: Bid[]
  mini?: boolean
}

const BidsPanel = ({ data, mini }: Prop) => {
  const { account } = useWeb3React()
  const dispatch = useAppDispatch()
  const [, setBid] = useAtom(bidAtom)
  const navigate = useNavigate()
  const [order, setOrder] = useState<OrderProps>({ by: 'date', dir: 'desc' })
  const [list, setList] = useState<Bid[]>(data)

  const [listing] = useAtom(listingAtom)

  useEffect(() => {
    ;(() => {
      if (order.by === 'price') {
        switch (order.dir) {
          case 'asc':
            setList(
              data.slice().sort((a, b) => a.amount.value - b.amount.value)
            )
            break
          case 'desc':
            setList(
              data.slice().sort((a, b) => b.amount.value - a.amount.value)
            )
            break
          default:
            break
        }
      }
      if (order.by === 'date') {
        switch (order.dir) {
          case 'asc':
            setList(data)
            break
          case 'desc':
            setList(data.slice().reverse())
            break
          default:
            break
        }
      }
    })()
  }, [order, data])

  const cancelBid = (bid: Bid) => {
    setBid(bid)
    dispatch(openModal(Popup.CANCEL_BID))
  }

  const acceptBid = (bid: Bid) => {
    setBid(bid)
    dispatch(openModal(Popup.ACCEPT_OFFER))
  }

  const FullPanel = () => {
    const bids = list?.map((bid) => ({
      assetName: bid.assetName,
      price: `${bid.amount.value} $${bid.amount.currency}`,
      seller: getOrder(bid)?.maker ?? '',
      activeUntil: formatDate(new Date(bid.activeUntil)),
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
                {value === 'price' || value === 'activeUntil' ? (
                  <SortBy value={value} order={order} sorter={setOrder}>
                    {_.startCase(value)}
                  </SortBy>
                ) : (
                  _.startCase(value)
                )}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {bids.map((bid, index) => (
            <tr key={index} className='border-b border-gray-300'>
              <td className='px-4'>{index + 1}</td>
              <td className='py-6 pr-4'>
                <span
                  className=' hover:underline hover:text-blue-700'
                  role='button'
                  onClick={() =>
                    navigate(
                      `/asset-details/${getOrder(list[index])?.erc721TokenId}`
                    )
                  }
                >
                  {bid.assetName}
                </span>
              </td>
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

  const MiniPanel = () => {
    const bids = list.map((bid) => ({
      owner: bid.owner,
      price: `${bid.amount.value} $${bid.amount.currency}`,
      date: formatDate(new Date(bid.createdAt)),
      action:
        account === bid.owner && bid.status === 'ACTIVE' ? (
          <button
            className='text-red-500 hover:cursor-pointer hover:underline'
            onClick={() => cancelBid(bid)}
          >
            Cancel
          </button>
        ) : account === listing?.makerAddress && bid.status === 'ACTIVE' ? (
          <button
            className='text-purple-700 hover:cursor-pointer hover:underline'
            onClick={() => acceptBid(bid)}
          >
            Accept
          </button>
        ) : (
          '-'
        )
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
                  value === 'status' ? 'w-[93px]' : '',
                  value === 'owner' ? 'w-[200px]' : '',
                  value === 'price' ? 'w-[140px]' : '',
                  value === 'action' ? 'w-[80px] pr-0' : ''
                )}
              >
                {value === 'price' || value === 'date' ? (
                  <SortBy value={value} order={order} sorter={setOrder}>
                    {_.startCase(value)}
                  </SortBy>
                ) : (
                  _.startCase(value)
                )}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {bids.map((bid, index) => (
            <tr key={index} className='border-b border-gray-300'>
              <td className='px-4'>{index + 1}</td>
              <td className='flex items-center gap-3 py-6 hover:text-blue-700 hover:underline'>
                <img
                  src='https://picsum.photos/id/61/32/32'
                  alt=''
                  className='rounded-full animate-skeleton h-8 w-8'
                />
                <span>{truncate(bid.owner, 6)}</span>
              </td>
              <td className='font-semibold'>{bid.price}</td>
              <td className='text-xs font-semibold text-gray-500 pr-4'>
                {bid.date}
              </td>
              <td>{bid.action}</td>
            </tr>
          ))}
        </tbody>
      </table>
    )
  }

  return <>{mini ? <MiniPanel /> : <FullPanel />}</>
}

export default BidsPanel
