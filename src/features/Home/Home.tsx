import { Layout, AssetCard } from '../shared'

const Home = () => {
  return (
    <Layout>
      <div className=''>
        <h1 className='text-3xl font-bold'>Home</h1>
        {/* ----------------Testing----------------- */}
        <AssetCard
          assetName='AssetName'
          owner='theOneOzenua'
          avatar='https://picsum.photos/31/31/?random'
          price='2,000'
          fave={32}
          asset='https://picsum.photos/600 /600/?random'
        />
        {/* ----------------Testing----------------- */}
      </div>
    </Layout>
  )
}

export { Home }
