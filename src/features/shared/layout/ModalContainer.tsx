export enum ModalSizes {
  NORMAL = 'w-[25rem]',
  LARGE = 'w-[30rem]',
  XLARGE = 'w-[35rem]'
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
