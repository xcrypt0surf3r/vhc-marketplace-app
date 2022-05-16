import { useWeb3React } from '@web3-react/core'
import { useEffect, useState } from 'react'
import { injected } from '../web3/connectors'

export const useEagerConnect = () => {
  const { activate, active } = useWeb3React()

  const [tried, setTried] = useState(false)

  useEffect(() => {
    injected.isAuthorized().then((isAuthorized: boolean) => {
      if (isAuthorized) {
        activate(injected, undefined, true).catch(() => {
          setTried(true)
        })
      } else {
        setTried(true)
      }
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []) // Run on mount

  // If connection succeeds, wait for that to flip tried flag
  useEffect(() => {
    if (!tried && active) {
      setTried(true)
    }
  }, [tried, active])

  return tried
}
