import { AssetWithListing } from '../../services/queries'

export const AssetImage = ({
  asset,
  className
}: {
  asset: AssetWithListing
  className: string
}) => {
  if (asset?.animationUrl) {
    return (
      <>
        <video
          autoPlay
          loop
          muted
          playsInline
          src={asset.animationUrl}
          itemType='video/mp4'
          className={className}
        />
      </>
    )
  }
  return (
    <>
      <img src={asset?.imageUrl} alt={asset?.name} className={className} />
    </>
  )
}
