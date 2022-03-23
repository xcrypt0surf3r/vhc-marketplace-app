export const isDev = () => process.env.APP_NODE_ENV !== 'production'

export const truncate = (address: string, n: number) => {
  const left = address.slice(0, n)
  const right = address.slice(-n)
  return `${left}...${right}`
}

export const classNames = (...classes: string[]) =>
  classes.filter(Boolean).join(' ')

export const styleTypology = (typology: string) => {
  return typology.charAt(0) + typology.slice(1).toLowerCase()
}
