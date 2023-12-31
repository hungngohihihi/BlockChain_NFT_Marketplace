import Identicon from 'react-identicons'
import { FaTimes } from 'react-icons/fa'
import { useGlobalState, setGlobalState, truncate, setAlert } from '../store'
import { buyNFT } from '../Blockchain.Services'

const ShowNFT = () => {
  const [showModal] = useGlobalState('showModal')
  const [connectedAccount] = useGlobalState('connectedAccount')
  const [nft] = useGlobalState('nft')

  const onChangePrice = () => {
    setGlobalState('showModal', 'scale-0')
    setGlobalState('updateModal', 'scale-100')
  }

  const handleNFTPurchase = async () => {
    setGlobalState('showModal', 'scale-0')
    setGlobalState('loading', {
      show: true,
      msg: 'Initializing NFT transfer...',
    })

    try {
      await buyNFT(nft)
      console.log(nft);
      setAlert('Transfer completed...', 'green')
      window.location.reload()
    } catch (error) {
      console.log('Error transfering NFT: ', error)
      setAlert('Purchase failed...', 'red')
    }
  }

  return (
    <div
      className={`fixed top-0 left-0 w-screen h-screen flex items-center
          justify-center bg-black bg-opacity-50 transform
          transition-transform duration-300 ${showModal}`}
    >
      <div className="bg-[#ffffff] shadow-lg shadow-black rounded-xl w-11/12 md:w-2/5 h-7/12 p-6">
        <div className="flex flex-col">
          <div className="flex flex-row justify-between items-center">
            <p className="font-semibold text-black">Buy NFT</p>
            <button
              type="button"
              onClick={() => setGlobalState('showModal', 'scale-0')}
              className="border-0 bg-transparent focus:outline-none"
            >
              <FaTimes className="text-gray-400" />
            </button>
          </div>

          <div className="flex flex-row justify-center items-center rounded-xl mt-5">
            <div className="shrink-0 rounded-xl overflow-hidden h-40 w-40">
              <a href={nft?.metadataURI} target="_blank" >
                <img
                  className="h-full w-full object-cover cursor-pointer"
                  src={nft?.metadataURI}
                  alt={nft?.title}
                />
              </a>
            </div>
          </div>

          <div className="flex flex-col justify-start rounded-xl mt-5">
            <h4 className="text-black font-semibold">{nft?.title}</h4>
            <p className="text-gray-400 text-xs my-1">{nft?.description}</p>

            <div className="flex justify-between items-center mt-3 text-black">
              <div className="flex justify-start items-center">
                <Identicon
                  string={nft?.owner}
                  size={50}
                  className="h-10 w-10 object-contain rounded-full mr-3"
                />
                <div className="flex flex-col justify-center items-start">
                  <small className="text-black font-bold">@owner</small>
                  <small className="text-black font-semibold">
                    {nft?.owner ? truncate(nft.owner, 4, 4, 11) : '...'}
                  </small>
                </div>
              </div>

              <div className="flex flex-col">
                <small className="text-xs">Current Price</small>
                <p className="text-sm font-semibold">{nft?.cost} ETH</p>
              </div>
            </div>
          </div>
          <div className="flex justify-between items-center space-x-2">
            {connectedAccount == nft?.owner ? (
              <button
                className="flex flex-row justify-center items-center
                w-full text-black text-md border-[#7b7b7b]
                py-2 px-5 rounded-full bg-transparent 
                drop-shadow-xl border bg-[#7b7b7b] hover:bg-[#000000]
                hover:bg-transparent hover:text-white
                hover:border hover:border-blue
                focus:outline-none focus:ring mt-5"
                onClick={onChangePrice}
              >
                Change Price
              </button>
            ) : (
              <button
                className="flex flex-row justify-center items-center
                w-full text-black text-md bg-[#7b7b7b] hover:bg-[#000000] py-2 px-5 rounded-full
                drop-shadow-xl border border-transparent
                hover:bg-transparent hover:text-[#7b7b7b]
                hover:border hover:border-blue
                focus:outline-none focus:ring mt-5"
                onClick={handleNFTPurchase}
              >
                Purchase Now
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ShowNFT
