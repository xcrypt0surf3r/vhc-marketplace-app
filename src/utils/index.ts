import { SignedERC721OrderStruct } from '@traderxyz/nft-swap-sdk'
import { Bid } from '../services/queries'
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

// TODO refactor app to use this instead of next two functions
export const getERC20TokenInfo = (
  currency: Currency
): { address: string; decimals: number } => {
  switch (currency) {
    case 'VHC':
      return {
        address: process.env.REACT_APP_VHC_ADDRESS!,
        decimals: 18
      }
    default:
      break
  }
  throw new Error('Unsupported currency type')
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

export const getERC20TokenDecimals = (currency: Currency) => {
  switch (currency) {
    case 'VHC':
      return 18
    default:
      break
  }
  throw new Error(
    'Unsupported currency type: cannot get decimals for unknown currency'
  )
}

export const getOrder = (bid: Bid) => {
  if (bid.order) {
    return JSON.parse(bid.order) as SignedERC721OrderStruct
  }

  return undefined
}

export const formatDate = (date: Date) => {
  const raw = new Intl.DateTimeFormat('en-US', {
    dateStyle: 'full',
    timeStyle: 'medium'
  }).format(date)

  const actual = raw.replace('at', ',').split(',')
  actual[1] = `${actual[1]},`
  switch (actual[0]) {
    case 'Monday':
      actual[0] = 'Mon'
      break
    case 'Tuesday':
      actual[0] = 'Tue'
      break
    case 'Wednesday':
      actual[0] = 'Wed'
      break
    case 'Thursday':
      actual[0] = 'Thu'
      break
    case 'Friday':
      actual[0] = 'Fri'
      break
    case 'Saturday':
      actual[0] = 'Sat'
      break
    case 'Sunday':
      actual[0] = 'Sun'
      break
    default:
      break
  }

  return actual
}

export const currencyExchange = async (
  amount: number,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  options?: { direction: 'VHC to USD' | 'USD to VHC' }
) => {
  const response = await fetch(
    'https://api.coingecko.com/api/v3/simple/price?include_last_updated_at=true&ids=vault-hill-city&vs_currencies=usd'
  )
  const jsonResponse = await response.json()
  return amount * jsonResponse['vault-hill-city'].usd
}

export const isDateElapsed = (date: string) => {
  const present = new Date().getTime()
  const moment = new Date(date).getTime()
  return present >= moment
}
