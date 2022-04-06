import { Currency } from '../__generated/enums'

export * from './imageUtils'
export const isDev = () => process.env.APP_NODE_ENV !== 'production'

export const truncate = (
  address: string,
  preEllipsis: number,
  postEllipsis?: number
) => {
  const left = address.slice(0, preEllipsis)
  const right = address.slice(-(postEllipsis ?? preEllipsis))
  return `${left}...${right}`
}

export const classNames = (...classes: string[]) =>
  classes.filter(Boolean).join(' ')

export const styleTypology = (typology: string) => {
  return typology.charAt(0) + typology.slice(1).toLowerCase()
}

// Todo delete this once new wallet balance changes merged in
export const convertHexToEthNumber = (value: string): number => {
  const wei = parseInt(value, 16)
  const eth = wei / 10 ** 18 // parse to Eth
  return eth
}

export const getERC20TokenAddress = (currency: Currency) => {
  switch (currency) {
    case 'VHC':
      return process.env.REACT_APP_VHC_ADDRESS
    default:
      break
  }
  throw new Error('Unsupported currency type')
}
