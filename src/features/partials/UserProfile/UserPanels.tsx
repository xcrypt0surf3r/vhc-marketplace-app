import { Tab } from '@headlessui/react'
import * as _ from 'lodash'
import BidsPanel from './BidPanel'
import PanelPlaceHolder from './PanelPlaceHolder'
import { Asset, Bid } from '../../../services/queries'
import { classNames } from '../../../utils'
import { AssetsListing } from '../AssetsListing'

type Panels = {
  assets: readonly Asset[]
  onSale: unknown[]
  favorites: unknown[]
  activities: unknown[]
  bids: readonly Bid[]
}

const UserPanels = ({
  panels,
  loading
}: {
  panels: Panels
  loading?: boolean
}) => {
  return (
    <div className='lg:p-6'>
      <Tab.Group>
        <Tab.List className='flex gap-10 border-gray-200 border-b justify-center'>
          {Object.keys(panels).map((panel) => (
            <Tab
              key={panel}
              className={({ selected }) =>
                classNames(
                  'py-2.5 text-sm',
                  selected ? 'border-[#8A22F2] border-b' : ''
                )
              }
            >
              {_.startCase(panel)}
            </Tab>
          ))}
        </Tab.List>
        <Tab.Panels className='mt-8'>
          {Object.keys(panels).map((panelName, idx) => (
            <Tab.Panel key={idx} className={classNames('bg-white rounded-lg')}>
              {panels[panelName as keyof Panels]!.length < 1 ? (
                <PanelPlaceHolder panelName={panelName} />
              ) : panelName === 'assets' ? (
                <AssetsListing
                  assets={(panels.assets as Asset[]) ?? []}
                  skeletons={8}
                  isLoading={loading}
                />
              ) : panelName === 'bids' ? (
                <BidsPanel data={panels.bids as Bid[]} />
              ) : (
                <PanelPlaceHolder panelName={panelName} />
              )}
            </Tab.Panel>
          ))}
        </Tab.Panels>
      </Tab.Group>
    </div>
  )
}

export default UserPanels
