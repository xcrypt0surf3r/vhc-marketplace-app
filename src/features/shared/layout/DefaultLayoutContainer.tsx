const DefaultLayoutContainer = ({
  children
}: {
  children: React.ReactNode
}) => {
  return (
    <main>
      <div>{children}</div>
    </main>
  )
}

export default DefaultLayoutContainer
