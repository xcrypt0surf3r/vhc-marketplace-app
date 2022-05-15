import { Tab } from '@headlessui/react'
import * as _ from 'lodash'
import { Bid, SalesHistory } from '../../../services/queries'
import { classNames } from '../../../utils'
import BidsPanel from '../UserProfile/BidPanel'
import PanelPlaceHolder from '../UserProfile/PanelPlaceHolder'
import SalesHistoryPanel from './SalesHistoryPanel'

type Panels = {
  bids?: readonly Bid[]
  salesHistory?: unknown[]
  owners?: unknown[]
}

const AssetPanels = ({ panels }: { panels: Panels; loading?: boolean }) => {
  return (
    <div>
      <Tab.Group>
        <Tab.List className='flex gap-10 border-gray-200 border-b'>
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
        <Tab.Panels className='mt-8 overflow-x-auto max-h-[400px]'>
          {Object.keys(panels).map((panelName, idx) => (
            <Tab.Panel
              key={idx}
              className='bg-white rounded-3xl border overflow-y-auto min-w-[541px]'
            >
              {panels[panelName as keyof Panels]!.length < 1 ? (
                <PanelPlaceHolder panelName={panelName} />
              ) : panelName === 'bids' ? (
                <BidsPanel data={panels.bids as Bid[]} mini />
              ) : panelName === 'salesHistory' ? (
                <SalesHistoryPanel
                  data={panels.salesHistory as SalesHistory[]}
                />
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

export default AssetPanels
