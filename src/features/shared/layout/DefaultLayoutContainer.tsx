import Widgets from '../../partials/Widgets'

const DefaultLayoutContainer = ({
  children
}: {
  children: React.ReactNode
}) => {
  return (
    <main>
      <Widgets />
      <div>{children}</div>
    </main>
  )
}

export default DefaultLayoutContainer
