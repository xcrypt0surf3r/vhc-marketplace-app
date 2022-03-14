export const isDev = () => process.env.APP_NODE_ENV !== 'production'

export function truncate(address: string, n: number) {
  const left = address.slice(0, n)
  const right = address.slice(-n)
  return `${left}...${right}`
}
