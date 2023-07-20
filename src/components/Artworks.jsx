import { useEffect, useState } from 'react'
import { setGlobalState, useGlobalState } from '../store'

const Artworks = () => {
  const [nfts] = useGlobalState('nfts')
  const [end, setEnd] = useState(4)
  const [count] = useState(4)
  const [collection, setCollection] = useState([])

  const getCollection = () => {
    return nfts.slice(0, end)
  }

  useEffect(() => {
    setCollection(getCollection())
  }, [nfts, end])

  return (
    <div className="bg-[#ffffff] ">
      <div className="w-4/5 py-10 mx-auto">
        <h4 className="text-black text-3xl font-bold ">
          {collection.length > 0 ? 'Trending in Photography' : 'No Artworks Yet'}
        </h4>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-4 lg:gap-3 py-2.5">
          {collection.map((nft, i) => (
            <Card key={i} nft={nft} />
          ))}
        </div>

        {collection.length > 0 && nfts.length > collection.length ? (
          <div className="text-center my-5">
            <button
              className="shadow-lg shadow-black text-white
              bg-[#7b7b7b] hover:bg-[#000000]
            rounded-full cursor-pointer p-2"
              onClick={() => setEnd(end + count)}
            >
              Load More
            </button>
          </div>
        ) : null}
      </div>
    </div>
  )
}

const Card = ({ nft }) => {
  const setNFT = () => {
    setGlobalState('nft', nft)
    setGlobalState('showModal', 'scale-100')
  }
  // console.log(nft.metadataURI);

  return (
    <div className="w-full shadow-xl shadow-#7b7b7b rounded-md overflow-hidden #7b7b7b my-2 p-3">
      <img
        src={nft.metadataURI}
        alt={nft.title}
        className="h-60 w-full object-cover shadow-lg shadow-#7b7b7b rounded-lg mb-3"
      />
      <h4 className="text-black font-semibold">{nft.title}</h4>
      <p className="text-black text-xs my-1">{nft.description}</p>
      <div className="flex justify-between items-center mt-3 text-black">
        <div className="flex flex-col">
          <small className="text-xs">Current Price</small>
          <p className="text-sm font-semibold">{nft.cost} ETH</p>
        </div>

        <button
          className="shadow-lg shadow-black text-white text-sm bg-[#7b7b7b] hover:bg-[#000000] cursor-pointer rounded-full px-1.5 py-1"
          onClick={setNFT}
        >
          View Details
        </button>
      </div>
    </div>
  )
}

export default Artworks
