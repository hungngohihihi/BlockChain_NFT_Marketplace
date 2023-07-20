import Identicon from 'react-identicons'
import { setGlobalState, useGlobalState, truncate } from '../store'

const Hero = () => {
  const [connectedAccount] = useGlobalState('connectedAccount')
  const onCreatedNFT = () => {
    setGlobalState('modal', 'scale-100')
  }

  return (
    <div
      className="flex flex-col md:flex-row w-4/5 justify-between 
      items-center mx-auto py-10"
    >
      <div className="md:w-3/6 w-full">
        <div>
          <h1 className="text-black text-5xl font-bold">
            Buy and Sell <br /> Photography, <br />
            <span className="">NFTs</span> 
          </h1>
          {/* <p className="text-gray-500 font-semibold text-sm mt-3">
            Mint and collect the hottest NFTs around.
          </p> */}
        </div>

        <div className="flex flex-row mt-5">
          <button
            className="shadow-lg shadow-black text-white
            bg-[#7b7b7b] hover:bg-[#000000]
            rounded-full cursor-pointer p-2"
            onClick={onCreatedNFT}
          >
            Create NFT
          </button>
        </div>

        <div className="w-3/4 flex justify-between items-center mt-5">
          <div>
            {/* <p className="text-black font-bold">1231k</p>
            <small className="text-black-300">User</small>
          </div>
          <div>
            <p className="text-black font-bold">152k</p>
            <small className="text-black-300">Artwork</small>
          </div>
          <div>
            <p className="text-black font-bold">200k</p>
            <small className="text-black-300">Photographer</small> */}
          </div>
        </div>
      </div>

      <div
        className="shadow-lg shadow-black md:w-2/5 w-full 
      mt-10 md:mt-0 rounded-md overflow-hidden bg-black"
      >
        <img
          src="https://ipfs.io/ipfs/QmSMW4H4RUrVnL7fxwcNgq3jVRmGJmnApgyPHSQo42RREP"
          alt="NFT Art"
          className="h-60 w-full object-cover"
        />
        <div className="flex justify-start items-center p-3">
          <Identicon
            string={connectedAccount ? connectedAccount : 'Connect Your Wallet'}
            size={50}
            className="h-10 w-10 object-contain rounded-full mr-3"
          />
          <div className="flex flex-col">
            <a href={'https://goerli.etherscan.io/address/' + connectedAccount} target="_blank" className="text-white font-semibold">
              {connectedAccount
                ? truncate(connectedAccount, 4, 4, 11)
                : 'Connect Your Wallet'}
            </a>
            <small className="text-blue-800 font-bold">@you</small>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Hero
