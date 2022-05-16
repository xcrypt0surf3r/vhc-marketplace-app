export enum ModalSizes {
  NORMAL = 'lg:w-[25rem]',
  LARGE = 'lg:w-[30rem]',
  XLARGE = 'lg:w-[35rem]'
}

const ModalContainer = ({
  size = ModalSizes.NORMAL,
  children
}: {
  size?: string
  children: React.ReactNode
}) => {
  return <div className={size}>{children}</div>
}

export default ModalContainer
