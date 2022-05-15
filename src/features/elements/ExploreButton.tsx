import { useNavigate } from 'react-router-dom'
import { Button, ButtonColors, ButtonSizes } from '../shared/Button'

const ExploreButton = () => {
  const navigate = useNavigate()
  return (
    <div className='flex justify-center mt-10'>
      <Button
        sizer={ButtonSizes.MEDIUM}
        color={ButtonColors.ANCILLARY}
        onClick={() =>
          navigate('/explore', {
            replace: true
          })
        }
      >
        Explore more
      </Button>
    </div>
  )
}

export default ExploreButton
