import { classNames } from '../../utils'

export enum ButtonColors {
  PRIMARY = 'text-white bg-purple-600',
  CONNECT = 'text-white bg-gradient-to-r from-pink-400 via-purple-500 to-blue-500'
}

export enum ButtonSizes {
  SMALL = 'px-2 md:px-3',
  MEDIUM = 'px-3 md:px-4',
  LARGE = 'px-4 md:px-5'
}

export const Button = ({
  sizer = ButtonSizes.MEDIUM,
  color = ButtonColors.PRIMARY,
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
        'py-3 items-center justify-center '
      )}
      {...props}
    >
      <span className='sr-only'>{children}</span>
      {children}
    </button>
  )
}

type ButtonProps = {
  className?: string
  color?: string
  sizer?: string
} & React.DetailedHTMLProps<
  React.SelectHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>
