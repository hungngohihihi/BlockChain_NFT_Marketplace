import timelessLogo from '../assets/timeless.png'
import { connectWallet } from '../Blockchain.Services'
import { useGlobalState, truncate } from '../store'

const Header = () => {
  const [connectedAccount] = useGlobalState('connectedAccount')
  return (
    <nav className="w-4/5 flex md:justify-center justify-between items-center py-4 mx-auto">
      <div className="md:flex-[0.5] flex-initial justify-center items-center">
        <a href="." >
          <img
            className="w-40 cursor-pointer"
            src={timelessLogo}
            alt="Timeless Logo"
          />
        </a>
      </div>

      <ul
        className="md:flex-[0.5] text-black md:flex
        hidden list-none flex-row justify-between 
        items-center flex-initial"
      >
        <a href="." className="mx-4 cursor-pointer">Market</a>
        <a href="." className="mx-4 cursor-pointer">Photographer</a>
        <a href="." className="mx-4 cursor-pointer">Features</a>
        <a href="." className="mx-4 cursor-pointer">Community</a>
      </ul>

      {connectedAccount ? (
        <button
          className="shadow-lg shadow-black text-white
        bg-[#7b7b7b] hover:bg-[#000000] md:text-xs p-2
          rounded-full cursor-pointer"
        >
          {truncate(connectedAccount, 4, 4, 11)}
        </button>
      ) : (
        <button
          className="shadow-lg shadow-black text-white
        bg-[#7b7b7b] hover:bg-[#000000] md:text-xs p-2
          rounded-full cursor-pointer"
          onClick={connectWallet}
        >
          Connect Wallet
        </button>
      )}
    </nav>
  )
}

export default Header
