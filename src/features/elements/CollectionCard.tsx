type Props = {
  id: number
  projectName: string
  url: string
  avatar: string
  description: string
}

const CollectionCard = ({
  id,
  projectName,
  url,
  avatar,
  description
}: Props) => {
  return (
    <div
      key={id}
      className='relative hover:shadow-lg hover:scale-105 transition-all hover:border-[.15rem] rounded-[1.25rem] border-[.0938rem] border-gray-200 xl:p-[.75rem] lg:p-[.5rem] p-[0.25rem]'
    >
      <div className='w-full overflow-hidden h-8 lg:h-18 xl:h-[6rem] rounded-[.75rem]'>
        <img
          src={url}
          alt={projectName}
          className='w-full object-center object-cover skeleton'
        />
      </div>
      <div className='absolute top-[5.5rem] right-28'>
        <img
          src={avatar}
          alt=''
          className='rounded-full h-10 w-10 border-white border-2'
        />
      </div>
      <div className='text-md py-4 mt-4 font-medium text-black text-center'>
        <a href={`/collection/${id}`}>{projectName}</a>
      </div>
      <div className='line-clamp-2 text-center'>{description}</div>
    </div>
  )
}

export { CollectionCard }
