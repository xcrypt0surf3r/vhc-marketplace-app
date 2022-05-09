import { useAtom } from 'jotai'
import { useState } from 'react'
import { useModal } from '../../../hooks/use-modal'
import { listingAtom } from '../../../state/atoms/listing.atoms'
import { classNames, truncate } from '../../../utils'
import { Button, ButtonColors, ButtonSizes } from '../../shared/Button'
import ModalContainer from '../../shared/layout/ModalContainer'
import Checkout from './Checkout'

export interface IBuyNow {
  [key: string]: string | number
}

const BuyNow = () => {
  const [accept, setAccept] = useState(false)
  const [listing] = useAtom(listingAtom)
  const { openModal } = useModal()

  const data: IBuyNow = {
    'Collection name': 'VLAND', // TODO Get collection name once server updates made.
    'Contract address': truncate(listing?.assetAddress ?? '', 8) ?? '-',
    'Date created': listing?.buyNow?.startDate
      ? new Date(listing?.buyNow?.startDate).toDateString()
      : '-'
  }

  const handleSubmit = () => {
    openModal('Checkout', <Checkout />)
  }
  return (
    <ModalContainer>
      <table className='table-fixed'>
        <tbody>
          {Object.keys(data).map((key) => (
            <tr key={key}>
              <td className='text-gray-700 w-[12rem] py-3'>{key}</td>
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
      <div className='flex gap-4 items-center justify-center my-7'>
        <input
          type='radio'
          checked={accept}
          onClick={() => {
            setAccept(!accept)
          }}
          className='h-5 w-5'
        />
        <span className='font-medium'>
          I understand that blockchain transactions are irreversible
        </span>
      </div>
      <Button
        magnify
        color={ButtonColors.PRIMARY}
        disabled={accept !== true}
        isDisabled={accept !== true}
        sizer={ButtonSizes.FULL}
        onClick={handleSubmit}
      >
        Continue
      </Button>
    </ModalContainer>
  )
}

export default BuyNow
