type Props = {
  size?: number
}

const WarningIcon = ({ size = 1.5 }: Props) => (
  <svg
    width={`${size * 10}px`}
    height={`${size * 10}px`}
    viewBox='0 0 82 82'
    fill='none'
  >
    <circle cx='41' cy='41' r='41' fill='#4D7EF2' />
    <path
      d='M41 30.729V43.4165'
      stroke='white'
      strokeWidth='4'
      strokeLinecap='round'
      strokeLinejoin='round'
    />
    <path
      d='M62.9422 32.7352V49.2652C62.9422 51.9718 61.4922 54.4853 59.148 55.8628L44.793 64.1519C42.4488 65.5052 39.5488 65.5052 37.1804 64.1519L22.8254 55.8628C20.4813 54.5094 19.0312 51.996 19.0312 49.2652V32.7352C19.0312 30.0286 20.4813 27.5151 22.8254 26.1376L37.1804 17.8485C39.5246 16.4952 42.4247 16.4952 44.793 17.8485L59.148 26.1376C61.4922 27.5151 62.9422 30.0044 62.9422 32.7352Z'
      stroke='white'
      strokeWidth='4'
      strokeLinecap='round'
      strokeLinejoin='round'
    />
    <path
      d='M41 51.1499V51.3916'
      stroke='white'
      strokeWidth='4'
      strokeLinecap='round'
      strokeLinejoin='round'
    />
  </svg>
)

export { WarningIcon }
