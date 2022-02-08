import community from '../../assets/images/community.png'
import {
  InstagramIcon,
  TelegramIcon,
  TwitterIcon
} from '../../assets/images/icons'

const Promotion = () => {
  return (
    <div className='bg-gray-100 rounded-2xl'>
      <div className='relative'>
        <div className='w-full h-28 sm:h-52 lg:absolute lg:top-0 lg:left-24 lg:w-[35%] md:h-[15rem] lg:h-[19.5rem] xl:h-[20rem] 2xl:h-[22rem]'>
          <img
            src={community}
            alt=''
            className='w-full h-full object-center object-cover'
          />
        </div>
        <div className='bg-gray-100 lg:bg-transparent'>
          <div className='max-w-[120rem] px-4 sm:px-6 lg:pl-[32rem]'>
            <div className='max-w-2xl mx-auto py-14 lg:py-14 lg:max-w-xl'>
              <div className='text-xl xl:pl-14 2xl:pl-28 lg:block lg:text-left text-center flex flex-col items-center'>
                <h1 className='mb-5 font-semibold text-gray-900 text-2xl sm:text-4xl'>
                  Join our community!
                </h1>
                <p className='mb-7 text-gray-600'>
                  {
                    "All the charts, date pickers, and notifications in the world can't beat checking off some items on a paper card."
                  }
                </p>
                <div className='md:flex md:gap-4'>
                  <a
                    href='#'
                    className='inline-block bg-gradient-to-r from-orange-400 via-purple-500 to-blue-500 border border-transparent py-3 px-8 rounded-3xl font-medium text-white text-base mb-5 md:m-0 magnify'
                  >
                    Join our discord channel
                  </a>
                  <div className='flex gap-3 items-center justify-center'>
                    <a href='#'>
                      <div className='bg-indigo-700 rounded-full p-3 magnify'>
                        <TelegramIcon color='white' size={2} />
                      </div>
                    </a>
                    <a href='#'>
                      <div className='bg-indigo-700 rounded-full p-3 magnify'>
                        <TwitterIcon color='white' size={2} />
                      </div>
                    </a>
                    <a href='#'>
                      <div className='bg-indigo-700 rounded-full p-3 magnify'>
                        <InstagramIcon color='white' size={2} />
                      </div>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export { Promotion }
