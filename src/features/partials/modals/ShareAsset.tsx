import { useState } from 'react'
import {
  EmailShareButton,
  FacebookShareButton,
  TelegramShareButton,
  TwitterShareButton
} from 'react-share'
import {
  TwitterIcon,
  FacebookIcon,
  EmailIcon,
  TelegramIcon,
  CopyLinkIcon
} from '../../../assets/images/icons'
import { copyTextToClipboard } from '../../../utils'
import ModalContainer, { ModalSizes } from '../../shared/layout/ModalContainer'

const ShareAsset = () => {
  const [copyText, setCopyText] = useState('Copy Link')

  const copyLink = (text: string) => {
    if (copyTextToClipboard(text)) {
      setCopyText('Copied!')
    }
  }

  return (
    <ModalContainer size={ModalSizes.LARGE}>
      <div className='flex flex-col justify-center items-center'>
        <div className='flex justify-center'>
          <div className='flex justify-end space-x-6 mt-6'>
            <div className='flex flex-col items-center'>
              <div className='border-2 border-gray-200 rounded-full w-20 h-20 flex items-center justify-center'>
                <FacebookShareButton url={window.location.href}>
                  <FacebookIcon color='#8A22F2' size={3.5} />
                </FacebookShareButton>
              </div>

              <span className='pt-2'>Facebook</span>
            </div>

            <div className='flex flex-col items-center'>
              <div className='border-2 border-gray-200 rounded-full w-20 h-20 flex items-center justify-center'>
                <TwitterShareButton url={window.location.href}>
                  <TwitterIcon color='#8A22F2' size={3.5} />
                </TwitterShareButton>
              </div>

              <span className='pt-2'>Twitter</span>
            </div>

            <div className='flex flex-col items-center'>
              <div className='border-2 border-gray-200 rounded-full w-20 h-20 flex items-center justify-center'>
                <EmailShareButton
                  subject='Share NFT'
                  body={`Shared NFT: ${window.location.href}`}
                  url={window.location.href}
                >
                  <EmailIcon color='#8A22F2' size={3.5} />
                </EmailShareButton>
              </div>

              <span className='pt-2'>Email</span>
            </div>

            <div className='flex flex-col items-center'>
              <div className='border-2 border-gray-200 rounded-full w-20 h-20 flex items-center justify-center'>
                <TelegramShareButton
                  title={`Shared NFT: ${window.location.href}`}
                  url={window.location.href}
                >
                  <TelegramIcon color='#8A22F2' size={3.5} />
                </TelegramShareButton>
              </div>

              <span className='pt-2'>Telegram</span>
            </div>

            <div className='flex flex-col items-center'>
              <div
                className='border-2 border-gray-200 rounded-full w-20 h-20 flex items-center justify-center cursor-pointer'
                onClick={() => copyLink(window.location.href)}
              >
                <CopyLinkIcon color='#8A22F2' size={3.5} />
              </div>

              <span className='pt-2'>{copyText}</span>
            </div>
          </div>
        </div>
      </div>
    </ModalContainer>
  )
}

export default ShareAsset
