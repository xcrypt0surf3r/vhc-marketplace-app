import { ClipLoader } from 'react-spinners'
import { classNames } from '../../utils'

export enum ButtonColors {
  SECONDARY = 'text-white bg-blue-500',
  PRIMARY = 'text-white bg-gradient-to-r from-[#BE9DED] to-[#A96CEF]',
  OUTLINE = 'text-[#A96CEF] border bg-white border-[#A96CEF]'
}

export enum ButtonSizes {
  SMALL = 'w-[7rem]',
  MEDIUM = 'w-[12rem]',
  LARGE = 'w-[17rem]',
  FULL = 'w-full'
}

export const Button = ({
  sizer = ButtonSizes.MEDIUM,
  color = ButtonColors.SECONDARY,
  isDisabled,
  isLoading,
  magnify,
  className = '',
  children,
  ...props
}: ButtonProps) => {
  return (
    <button
      className={classNames(
        color,
        sizer,
        className,
        'py-3 px-3 md:px-4',
        !isDisabled && magnify ? 'magnify' : ''
      )}
      {...props}
    >
      {isLoading ? (
        <ClipLoader size={20} color='white' />
      ) : (
        <>
          <span className='sr-only'>{children}</span>
          {children}
        </>
      )}
    </button>
  )
}

type ButtonProps = {
  isDisabled?: boolean
  isLoading?: boolean
  className?: string
  color?: string
  sizer?: string
  magnify?: boolean
} & React.DetailedHTMLProps<
  React.SelectHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>
