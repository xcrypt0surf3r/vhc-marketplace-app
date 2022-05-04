import { Tab } from '@headlessui/react'
import * as _ from 'lodash'
import { Bid } from '../../../services/queries'
import { classNames } from '../../../utils'
import BidsPanel from '../UserProfile/BidPanel'
import PanelPlaceHolder from '../UserProfile/PanelPlaceHolder'

type Panels = {
  bids?: readonly Bid[]
  salesHistory?: unknown[]
  owners?: unknown[]
}

const AssetPanels = ({ panels }: { panels: Panels; loading?: boolean }) => {
  return (
    <div className='lg:p-6'>
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
        <Tab.Panels className='mt-8'>
          {Object.keys(panels).map((panelName, idx) => (
            <Tab.Panel
              key={idx}
              className={classNames(
                'bg-white rounded-lg border-[#E4ECF7]-600 border-2'
              )}
            >
              {panels[panelName as keyof Panels]!.length < 1 ? (
                <PanelPlaceHolder panelName={panelName} />
              ) : panelName === 'bids' ? (
                <BidsPanel data={panels.bids as Bid[]} mini />
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
