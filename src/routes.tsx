import { useWeb3React } from '@web3-react/core'
import React, { lazy } from 'react'
import { Navigate, RouteProps, useLocation } from 'react-router-dom'
import DefaultLayout from './features/shared/layout/Default'
import Explore from './pages/explore'

const Landing = lazy(() => import('./pages/landing'))
const PageNotFound = lazy(() => import('./pages/not-found'))
const AssetDetails = lazy(() => import('./pages/asset-details'))
const UserProfile = lazy(() => import('./pages/user-profile'))
const SellAsset = lazy(() => import('./pages/sell-asset'))

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

const ProtectedRoute = ({
  ...props
}: {
  children: React.ReactNode
  layout: LayoutTemplate
}) => {
  const location = useLocation()
  const { account } = useWeb3React()

  if (!account) return <Navigate to='/' replace state={{ from: location }} />
  return <RenderRoute {...props} />
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
    path: '/asset-details/:tokenId',
    element: (
      <RenderRoute layout={LayoutTemplate.DEFAULT}>
        <AssetDetails />
      </RenderRoute>
    )
  },
  {
    path: '/profile',
    element: (
      <ProtectedRoute layout={LayoutTemplate.DEFAULT}>
        <UserProfile />
      </ProtectedRoute>
    )
  },
  {
    path: '/sell-asset/:tokenId',
    element: (
      <RenderRoute layout={LayoutTemplate.DEFAULT}>
        <SellAsset />
      </RenderRoute>
    )
  },
  {
    path: '/explore',
    element: (
      <RenderRoute layout={LayoutTemplate.DEFAULT}>
        <Explore />
      </RenderRoute>
    )
  },
  {
    path: '*',
    element: <PageNotFound />
  }
]
