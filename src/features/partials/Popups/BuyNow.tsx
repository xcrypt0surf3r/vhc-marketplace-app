import { useState } from 'react'
import { buyNow, IBuyNow } from '../../../fake-data/buy-now'
import { useAppDispatch } from '../../../state'
import { openModal, Popup } from '../../../state/popup.slice'
import { classNames, truncate } from '../../../utils'
import { Button, ButtonColors, ButtonSizes } from '../../shared/Button'
import { Modal } from '../../shared/Modal'

const BuyNow = () => {
  const [accept, setAccept] = useState(false)
  const data = {
    ...buyNow,
    'Contract address': truncate(buyNow['Contract address'] as string, 8)
  } as IBuyNow

  const dispatch = useAppDispatch()

  const handleSubmit = () => {
    dispatch(openModal(Popup.CHECKOUT))
  }
  return (
    <Modal heading='Buy now' align='center' className='max-w-[34rem]'>
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
        className='rounded-xl disabled:opacity-50 disabled:cursor-not-allowed'
      >
        Continue
      </Button>
    </Modal>
  )
}

export default BuyNow
