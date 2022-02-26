import { lazy } from 'react'
import { RouteProps } from 'react-router-dom'
import DefaultLayout from './features/shared/layout/Default'

const Landing = lazy(() => import('./pages/home'))
const PageNotFound = lazy(() => import('./pages/not-found'))

export enum LayoutTemplate {
  DEFAULT
}

const Layout = (props: {
  children: React.ReactNode
  template: LayoutTemplate
}) => {
  const { template, children } = props
  switch (template) {
    case LayoutTemplate.DEFAULT:
      return <DefaultLayout>{children}</DefaultLayout>
    default:
      return <>{children}</>
  }
}

const RenderRoute = ({
  children,
  layout
}: {
  children: React.ReactNode
  layout: LayoutTemplate
}) => {
  return <Layout template={layout}>{children}</Layout>
}

export const routes: RouteProps[] = [
  {
    path: '/',
    element: (
      <RenderRoute layout={LayoutTemplate.DEFAULT}>
        <Landing />
      </RenderRoute>
    )
  },
  {
    path: '*',
    element: <PageNotFound />
  }
]
