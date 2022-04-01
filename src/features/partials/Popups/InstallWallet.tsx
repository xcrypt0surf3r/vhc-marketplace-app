import React from 'react'
import {
  GlobeIcon,
  LockIcon,
  PaperclipIcon
} from '../../../assets/images/icons'
import { classNames } from '../../../utils'
import { Button, ButtonSizes } from '../../shared/Button'
import { Modal } from '../../shared/Modal'

const InstallWallet = () => {
  const IconWrapper = ({ children }: { children: React.ReactNode }) => {
    return (
      <div className='flex items-center justify-center rounded-full bg-gray-200 h-10 w-10'>
        {children}
      </div>
    )
  }
  const styles = 'flex space-x-4 items-center'
  return (
    <Modal heading='Install Wallet Extension on your browser'>
      <a
        href='https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn?hl=en'
        target='_blank'
        rel='noreferrer'
      >
        <Button sizer={ButtonSizes.FULL} className='rounded-xl mt-8 mb-12'>
          Install extension
        </Button>
      </a>
      <div className='flex flex-col space-y-4 justify-start'>
        <div className={classNames(styles)}>
          <IconWrapper>
            <PaperclipIcon />
          </IconWrapper>
          <span className='text-[14px]'>
            Connect to crypto apps with one click
          </span>
        </div>
        <div className={classNames(styles)}>
          <IconWrapper>
            <LockIcon />
          </IconWrapper>
          <span className='text-[14px]'>
            Private keys remain secure on mobile app
          </span>
        </div>
        <div className={classNames(styles)}>
          <IconWrapper>
            <GlobeIcon />
          </IconWrapper>
          <span className='text-[14px]'>Compatible with all crypto apps</span>
        </div>
      </div>
    </Modal>
  )
}

export default InstallWallet
