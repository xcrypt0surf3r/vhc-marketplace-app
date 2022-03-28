import { useEffect, useState } from 'react'

const BidCountDownTimer = ({
  startDate,
  endDate
}: {
  startDate?: Date
  endDate?: Date
}) => {
  const [distance, setDistance] = useState(0)

  const startTime = new Date(startDate ?? 0).getTime()
  const endingOn = new Date(endDate ?? 0)
  const endTime = endingOn.getTime()

  const days = Math.floor(distance / (1000 * 60 * 60 * 24))
  const hours = Math.floor(
    (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  )
  const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))
  const seconds = Math.floor((distance % (1000 * 60)) / 1000)

  const time = [
    { name: 'Days', value: days },
    { name: 'Hours', value: hours },
    { name: 'Minutes', value: minutes },
    { name: 'Seconds', value: seconds }
  ]

  useEffect(() => {
    const timer = setTimeout(() => {
      const diff = Math.abs(Date.now() - endTime)
      setDistance(diff)
    }, 1000)

    if (distance < 0) {
      clearTimeout(timer)
    }
  }, [distance, startTime, endTime])

  return (
    <div className='flex flex-col gap-2 mb-4'>
      <span className='text-gray-500'>Sales ends {endingOn.toUTCString()}</span>
      <div className='flex gap-3'>
        {time.map((subunit, index) => (
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
