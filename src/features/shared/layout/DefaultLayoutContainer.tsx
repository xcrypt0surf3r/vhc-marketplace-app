import { Modal } from '../Modal'

const DefaultLayoutContainer = ({
  children
}: {
  children: React.ReactNode
}) => {
  return (
    <main>
      <Modal />
      <div>{children}</div>
    </main>
  )
}

export default DefaultLayoutContainer
