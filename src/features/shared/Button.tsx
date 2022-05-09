import { classNames } from '../../utils'

export enum ButtonColors {
  PRIMARY = 'text-white btn-primary-gradient',
  SECONDARY = 'text-white bg-[#BE9DED]',
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
        'rounded-3xl py-3 px-3 md:px-4 disabled:opacity-50 disabled:cursor-not-allowed',
        !isDisabled && magnify ? 'magnify' : ''
      )}
      {...props}
    >
      <>
        <span className='sr-only'>{children}</span>
        {children}
      </>
    </button>
  )
}

type ButtonProps = {
  isDisabled?: boolean
  className?: string
  color?: string
  sizer?: string
  magnify?: boolean
} & React.DetailedHTMLProps<
  React.SelectHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>
