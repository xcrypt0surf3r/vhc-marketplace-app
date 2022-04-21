import bulkCoinIcon from '../../../assets/images/icons/bulk-coin.svg'

const PanelPlaceHolder = ({ panelName }: { panelName: string }) => {
  return (
    <div className='bg-slate-100 m-2 flex flex-col items-center justify-center h-80'>
      <img src={bulkCoinIcon} alt={panelName} className='pt-8 px-8' />
      <span className='pb-8 font-sm text-slate-400'>
        {panelName === 'bids'
          ? 'No active bids'
          : panelName === 'assets'
          ? 'No asset'
          : panelName === 'onSale'
          ? 'No asset on sale'
          : panelName === 'favorites'
          ? 'No favorite asset'
          : panelName === 'activities'
          ? 'No activity'
          : 'Empty'}
      </span>
    </div>
  )
}

export default PanelPlaceHolder
