import makeBlockie from 'ethereum-blockies-base64'
import { useEffect, useState } from 'react'
import * as _ from 'lodash'
import { SalesHistory } from '../../../services/queries'
import { classNames, formatDate, truncate } from '../../../utils'
import SortBy, { OrderProps } from '../../shared/SortBy'
import currencyIcon from '../../../assets/images/icons/currency.svg'

const SalesHistoryPanel = ({ data }: { data: SalesHistory[] }) => {
  const [history, setHistory] = useState<SalesHistory[]>(data as SalesHistory[])
  const [order, setOrder] = useState<OrderProps>({ by: 'date', dir: 'desc' })

  useEffect(() => {
    ;(() => {
      if (order.by === 'price') {
        switch (order.dir) {
          case 'asc':
            setHistory(
              data.slice().sort((a, b) => a.price.value - b.price.value)
            )
            break
          case 'desc':
            setHistory(
              data.slice().sort((a, b) => b.price.value - a.price.value)
            )
            break
          default:
            break
        }
      }
      if (order.by === 'datePurchased') {
        switch (order.dir) {
          case 'asc':
            setHistory(data)
            break
          case 'desc':
            setHistory(data.slice().reverse())
            break
          default:
            break
        }
      }
    })()
  }, [order, data])

  const salesHistory = history.map((sale) => ({
    name: sale.taker,
    price: `${sale.price.value} $${sale.price.currency}`,
    datePurchased: formatDate(new Date(sale.dateOfSale))
  }))

  return (
    <table className='w-full table-fixed'>
      <thead className='border-b border-gray-200 p-4'>
        <tr>
          <th className='w-11 p-4 font-normal text-left'>#</th>
          {Object.keys(salesHistory[0]).map((value, index) => (
            <th
              key={index}
              className={classNames(
                'capitalize text-gray-600 font-normal text-left pr-4 py-4'
              )}
            >
              {value === 'price' || value === 'datePurchased' ? (
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
        {salesHistory.map((his, index) => (
          <tr
            key={index}
            className={classNames(
              'border-gray-200',
              salesHistory.length - 1 !== index ? 'border-b' : ''
            )}
          >
            <td className='px-4'>{index + 1}</td>
            <td className='flex items-center gap-3 py-6 hover:text-blue-700 hover:underline'>
              <img
                src={makeBlockie(his.name)}
                alt=''
                className='rounded-full skeleton h-8 w-8'
              />
              <span>{truncate(his.name, 6)}</span>
            </td>
            <td>
              <div className='flex gap-2 items-center'>
                <img
                  src={currencyIcon}
                  alt={'currency icon'}
                  className='w-7 h-7 rounded-full'
                />
                <span>{his.price}</span>
              </div>
            </td>
            <td className='pr-4'>{his.datePurchased}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export default SalesHistoryPanel
