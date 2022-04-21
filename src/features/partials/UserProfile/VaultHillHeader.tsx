import { BadgeCheckIcon } from '@heroicons/react/solid'
import { classNames } from '../../../utils'

const ballColors = [
  'bg-[#FFEED7]',
  'bg-[#CDE2C6]',
  'bg-[#D2E8FD]',
  'bg-[#FCF1F0]'
]

const Ball = ({ className }: { className: string }) => (
  <div className={classNames(className, 'h-8 w-8 rounded-full')} />
)

const VaultHeader = () => {
  return (
    <div className='flex flex-col items-center justify-center mb-72'>
      <img
        src='https://picsum.photos/id/61/1700/320'
        alt=''
        className='rounded-3xl animate-skeleton h-[320px] w-[1700px]'
      />
      <div className='flex justify-center'>
        <div className='absolute -translate-y-12'>
          <div className='flex flex-col text-center justify-center items-center gap-4'>
            <div className='flex justify-center items-center'>
              <img
                src='https://picsum.photos/id/46/80/80'
                alt=''
                className='rounded-full border-8 border-white h-[80px] w-[80px] animate-skeleton'
              />
            </div>
            <div className='flex gap-2 items-center'>
              <span className='font-prototype'>Vault Hill</span>
              <BadgeCheckIcon className='h-6 w-6 text-purple-600' />
            </div>
            <div>
              Created by
              <span className='text-blue-400'>
                {' Vault Hill City Metaverse'}
              </span>
            </div>
            <p className='text-center max-w-lg line-clamp-3'>
              {
                'Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet.'
              }
            </p>
            <div className='flex gap-2 mt-4'>
              {Array(4)
                .fill(1)
                .map((item, index) => (
                  <Ball key={index} className={classNames(ballColors[index])} />
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default VaultHeader
