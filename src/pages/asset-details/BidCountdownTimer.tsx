import { useEffect, useState } from 'react'
import { formatDate } from '../../utils'

const BidCountDownTimer = ({ endDate }: { endDate?: Date }) => {
  const [timeDifference, setTimeDifference] = useState(0)

  const endingOn = formatDate(new Date(endDate ?? 0))
  const presentTime = Date.now()
  const endTime = new Date(endDate ?? 0).getTime()

  const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24))
  const hours = Math.floor(
    (timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  )
  const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60))
  const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000)

  const counter = [
    { name: 'Days', value: days },
    { name: 'Hours', value: hours },
    { name: 'Minutes', value: minutes },
    { name: 'Seconds', value: seconds }
  ]

  useEffect(() => {
    const timer = setTimeout(() => {
      const diff = endTime - presentTime
      setTimeDifference(diff)
    }, 1000)

    if (endTime < presentTime) {
      setTimeDifference(0)
      clearTimeout(timer)
    }
  }, [timeDifference, endTime, presentTime])

  return (
    <div className='flex flex-col gap-2 mb-4'>
      <span className='text-gray-500'>
        Sales {timeDifference <= 0 ? 'ended' : 'ends'} {endingOn}
      </span>
      <div className='flex gap-3'>
        {counter.map((subunit, index) => (
          <div key={index} className='flex flex-col gap-1 items-center'>
            <span className='text-3xl font-prototype'>
              {subunit.value < 10 && 0}
              {subunit.value}
            </span>
            <span className='text-gray-400'>{subunit.name}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default BidCountDownTimer
