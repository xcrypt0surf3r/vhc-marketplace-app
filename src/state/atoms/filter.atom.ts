import { atom, Getter, Setter } from 'jotai'
import { isEqual } from 'lodash'

export type PriceFilter = {
  currency: 'VHC'
  from: string
  to: string
}

type Filter = {
  type: string[]
  district: string[]
  price: PriceFilter | null
}

type Payload = {
  label: 'type' | 'price' | 'district'
  value: string | PriceFilter | null
  action: 'remove' | 'add'
}

export const defaultFilter = {
  type: [],
  district: [],
  price: null
}

const filterByTypeAtom = atom<string[]>([])

const filterByDistrictAtom = atom<string[]>([])

const filterByPriceAtom = atom<PriceFilter | null>(null)

export const filterAtom = atom<Filter>(defaultFilter)

export const updateFilterAtom = atom(
  null,
  async (get: Getter, set: Setter, { label, value, action }: Payload) => {
    const filter = get(filterAtom)
    const option = typeof value === 'string' ? value.toUpperCase() : value

    if (label === 'type') {
      const filterByType = get(filterByTypeAtom)

      let newFilterByType: string[] = []

      if (action === 'add') {
        newFilterByType = [...filterByType, option] as string[]
      }

      if (action === 'remove') {
        newFilterByType = filterByType.filter((item) => item !== option)
      }

      set(filterByTypeAtom, newFilterByType)
      set(filterAtom, { ...filter, type: newFilterByType })
    }

    if (label === 'district') {
      const filterByDistrict = get(filterByDistrictAtom)

      let newfilterByDistrict: string[] = []

      if (action === 'add') {
        newfilterByDistrict = [...filterByDistrict, option] as string[]
      }

      if (action === 'remove') {
        newfilterByDistrict = filterByDistrict.filter((item) => item !== option)
      }

      set(filterByDistrictAtom, newfilterByDistrict)
      set(filterAtom, { ...filter, district: newfilterByDistrict })
    }

    if (label === 'price') {
      if (!option) {
        set(filterByPriceAtom, null)
        set(filterAtom, { ...filter, price: null })
        return
      }
      const filterByPrice = get(filterByPriceAtom)

      const newfilterByPirce = { ...(option as PriceFilter) }

      const hasChanged = !isEqual(filterByPrice, newfilterByPirce)

      if (hasChanged) {
        set(filterByPriceAtom, newfilterByPirce)
        set(filterAtom, { ...filter, price: newfilterByPirce })
      }
    }
  }
)
