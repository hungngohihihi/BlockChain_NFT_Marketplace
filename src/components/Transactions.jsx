import { useEffect, useState } from 'react'
import { BiTransfer } from 'react-icons/bi'
import { MdOpenInNew } from 'react-icons/md'
import { useGlobalState, truncate } from '../store'

const Transactions = () => {
  const [transactions] = useGlobalState('transactions')
  const [addressContract] = useGlobalState('addressContract')
  const [nfts] = useGlobalState('nfts')
  const [end, setEnd] = useState(3)
  const [count] = useState(3)
  const [collection, setCollection] = useState([])

  const getCollection = () => {
    return transactions.slice(0, end)
  }

  const path = 'https://goerli.etherscan.io/address/' + addressContract;
  // const pathAddress = 'https://goerli.etherscan.io/address/' + tx.owner;

  // console.log(transactions[3]);

  // console.log(addressContract);

  useEffect(() => {
    setCollection(getCollection())
  }, [transactions, end])

  return (
    <div className="bg-[#ffffff]">
      <div className="w-4/4 py-10 mx-auto">
        <h4 className="text-black text-3xl font-bold ">
          {collection.length > 0 ? 'Transactions' : 'No Transaction Yet'}
        </h4>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-4 lg:gap-2 py-2.5">
          {collection.map((tx) => (
            <div
              key={tx.id}
              className="flex justify-between items-center border border-#7b7b7b
               text-black w-full shadow-lg shadow-black rounded-md overflow-hidden bg-white my-2 p-3"
            >
              <div className="rounded-md shadow-sm shadow-#7b7b7b p-2">
                <a href={'https://goerli.etherscan.io/address/' + tx.owner} target="_blank" >
                  <BiTransfer />
                </a>
              </div>

              <div>
                {/* <h1 className="text-sm">{tx.fee} Transfered</h1> */}
                {/* <h1 className="text-sm">{tx.owner} Transfered</h1> */}
                <h4 className="text-sm">{tx.title} Transfered</h4>
                <small className="flex flex-row justify-start items-center">
                  <span className="mr-1">Received by</span>
                  <a href={'https://goerli.etherscan.io/address/' + tx.owner} target="_blank" className="text-[#7b7b7b] mr-2">
                    {truncate(tx.owner, 4, 4, 11)}
                  </a>
                  <a href={path} target="_blank">
                    {/* {console.log(transaction)} */}
                    <MdOpenInNew />
                  </a>
                </small>
              </div>

              <p className="text-sm font-medium">{tx.cost}ETH</p>
            </div>
          ))}
        </div>

        {collection.length > 0 && transactions.length > collection.length ? (
          <div className="text-center my-5">
            <button
              className="shadow-lg shadow-black text-white
              bg-[#7b7b7b] hover:bg-[#000000]
            rounded-full cursor-pointer p-2"
              onClick={() => setEnd(end + count)}
            >
              More
            </button>
          </div>
        ) : null}
      </div>
    </div>
  )
}

export default Transactions
