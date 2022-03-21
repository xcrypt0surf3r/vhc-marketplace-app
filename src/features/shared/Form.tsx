import { classNames } from '../../utils'

export enum ButtonColors {
  PRIMARY = 'text-white bg-purple-600',
  GRADIENT = 'text-white bg-gradient-to-r from-pink-400 via-purple-500 to-blue-500'
}

export enum ButtonSizes {
  SMALL = 'w-[7rem]',
  MEDIUM = 'w-[12rem]',
  LARGE = 'w-[17rem]',
  FULL = 'w-full'
}

export const Button = ({
  sizer = ButtonSizes.MEDIUM,
  color = ButtonColors.PRIMARY,
  isDisabled,
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
        !isDisabled ? 'magnify' : ''
      )}
      {...props}
    >
      <span className='sr-only'>{children}</span>
      {children}
    </button>
  )
}

type ButtonProps = {
  isDisabled?: boolean
  className?: string
  color?: string
  sizer?: string
} & React.DetailedHTMLProps<
  React.SelectHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>
