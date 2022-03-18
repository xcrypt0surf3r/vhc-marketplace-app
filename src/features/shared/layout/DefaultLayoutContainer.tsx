import Popups from '../../partials/Popups'

const DefaultLayoutContainer = ({
  children
}: {
  children: React.ReactNode
}) => {
  return (
    <main>
      <Popups />
      <div>{children}</div>
    </main>
  )
}

export default DefaultLayoutContainer
