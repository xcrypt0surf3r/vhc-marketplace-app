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

export const convertHexToEthNumber = (value: string): number => {
  const wei = parseInt(value, 16)
  const eth = wei / 10 ** 18 // parse to Eth
  return eth
}
