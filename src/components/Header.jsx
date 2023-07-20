import openseeLogo from '../assets/opensee.png'
import { connectWallet } from '../Blockchain.Services'
import { useGlobalState, truncate } from '../store'
// import imgLogo from '../assets/logo.png'

const Header = () => {
  const [connectedAccount] = useGlobalState('connectedAccount')
  return (
    <nav className="w-4/5 flex md:justify-center justify-between items-center py-4 mx-auto">
      {/* <Link className={cx("logo_link")} to="/">
        <img src={imgLogo} alt="logo" />
      </Link> */}
      <div className="md:flex-[0.5] flex-initial justify-center items-center">
        <a href="." >
          <img
            className="w-44 cursor-pointer"
            src={openseeLogo}
            alt="opensee Logo"
          />
        </a>
      </div>

      <ul
        className="md:flex-[0.5] text-black md:flex
        hidden list-none flex-row justify-between 
        items-center flex-initial"
      >
        {/* <a href="." className="mx-4 cursor-pointer">Market</a>
        <a href="." className="mx-4 cursor-pointer">Photographer</a>
        <a href="." className="mx-4 cursor-pointer">Music</a>
        <a href="." className="mx-4 cursor-pointer">Game</a> */}
      </ul>

      {connectedAccount ? (
        <button
          className="shadow-lg shadow-black text-white
        bg-[#7b7b7b] hover:bg-[#000000] md:text-xs p-2
          rounded-full cursor-pointer"
        >
          {/* {truncate(connectedAccount, 4, 4, 11)} */}
          {connectedAccount}
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
