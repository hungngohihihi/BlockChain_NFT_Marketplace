import timelessLogo from '../assets/timeless.png'

const Footer = () => (
  <div className="w-full flex md:justify-center justify-between items-center flex-col p-4 gradient-bg-footer">
    <div className="w-full flex sm:flex-row flex-col justify-between items-center my-4">
      <div className="flex flex-[0.25] justify-center items-center">
        <a href="." >
          <img src={timelessLogo} alt="logo" className="w-40 cursor-pointer" />
        </a>
      </div>

      <div className="flex flex-1 justify-evenly items-center flex-wrap sm:mt-0 mt-5 w-full">
        <a href="." className="text-black text-base text-center mx-2 cursor-pointer">
          Market
        </a>
        <a href="." className="text-black text-base text-center mx-2 cursor-pointer">
          Photographer
        </a>
        <a href="." className="text-black text-base text-center mx-2 cursor-pointer">
          Features
        </a>
        <a href="." className="text-black text-base text-center mx-2 cursor-pointer">
          Community
        </a>
      </div>

      <div className="flex flex-[0.25] justify-center items-center">
        <p className="text-black text-right text-xs">
          &copy;2022 All rights reserved
        </p>
      </div>
    </div>
  </div>
)

export default Footer
