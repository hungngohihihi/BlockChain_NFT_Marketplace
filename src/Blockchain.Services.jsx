import Web3 from 'web3'
import {  setGlobalState, getGlobalState, setAlert } from './store'
import { useGlobalState } from './store'
import abi from './abis/TimelessNFT.json'

const { ethereum } = window
window.web3 = new Web3(ethereum)
window.web3 = new Web3(window.web3.currentProvider)

const getEtheriumContract = async () => { //lấy thông tin smartcontract TimelessNFT từ mạng Ethereum.
  const web3 = window.web3   //lấy phiên bản Web3 
  const networkId = await web3.eth.net.getId() //lấy ID của mạng hiện tại 
  const networkData = abi.networks[networkId]  //kiểm tra xem có đúng id không
  // console.log("contract._address")
  // try{
  //   // const [addressContract] = useGlobalState('addressContract')
  // }catch(error){
  //   console.log(error)
  // }


  if (networkData) {
    const contract = new web3.eth.Contract(abi.abi, networkData.address)
    // console.log(contract._address);
    // setGlobalState('addressContract', contract._address);
    // console.log("contract._addressaaa")
    console.log(contract);
    return contract
  } else {
    console.log("contract._address")
    return null
  }
}

const connectWallet = async () => {
  try {
    if (!ethereum) return reportError('Please install Metamask')
    const accounts = await ethereum.request({ method: 'eth_requestAccounts' })  //Nếu thành công, lấy danh sách acount và lưu account được kết nối vào trạng thái toàn cục.
    setGlobalState('connectedAccount', accounts[0].toLowerCase())
  } catch (error) {
    reportError(error)
  }
}

const isWallectConnected = async () => { //kiểm tra xem ví đã được kết nối chưa
  try {
    if (!ethereum) return reportError('Please install Metamask')
    const accounts = await ethereum.request({ method: 'eth_accounts' })

    window.ethereum.on('chainChanged', (chainId) => {
      window.location.reload()
    })

    window.ethereum.on('accountsChanged', async () => {
      setGlobalState('connectedAccount', accounts[0].toLowerCase())
      await isWallectConnected()
    })

    if (accounts.length) {
      setGlobalState('connectedAccount', accounts[0].toLowerCase())
    } else {
      setGlobalState('connectedAccount', '')
      reportError('Please connect wallet.')
    }
  } catch (error) {
    reportError(error)
  }
}

const structuredNfts = (nfts) => { //chuyển đổi dữ liệu NFT thành một định dạng cụ thể.
  return nfts
    .map((nft) => ({
      id: Number(nft.id),
      owner: nft.owner.toLowerCase(),
      cost: window.web3.utils.fromWei(nft.cost),
      title: nft.title,
      description: nft.description,
      metadataURI: nft.metadataURI,
      timestamp: nft.timestamp,
    }))
    .reverse()
}

const getAllNFTs = async () => { //ấy tất cả các NFT và giao dịch từ contract
  try {
    if (!ethereum) return reportError('Please install Metamask')

    const contract = await getEtheriumContract()
    const nfts = await contract.methods.getAllNFTs().call()
    const transactions = await contract.methods.getAllTransactions().call()

    setGlobalState('nfts', structuredNfts(nfts))
    setGlobalState('transactions', structuredNfts(transactions))
  } catch (error) {
    reportError(error)
  }
}

const mintNFT = async ({ title, description, metadataURI, price }) => { //tạo một NFT mới bằng cách gửi Ether cho contract
  try {
    price = window.web3.utils.toWei(price.toString(), 'ether')
    const contract = await getEtheriumContract()
    const account = getGlobalState('connectedAccount')
    const mintPrice = window.web3.utils.toWei('0.01', 'ether')

    await contract.methods
      .payToMint(title, description, metadataURI, price)
      .send({ from: account, value: mintPrice })

    return true
  } catch (error) {
    reportError(error)
  }
}

const buyNFT = async ({ id, cost }) => { //mua một NFT bằng cách gửi Ether cho hợp đồng.
  try {
    cost = window.web3.utils.toWei(cost.toString(), 'ether')
    const contract = await getEtheriumContract()
    const buyer = getGlobalState('connectedAccount')

    await contract.methods
      .payToBuy(Number(id))
      .send({ from: buyer, value: cost })

    return true
  } catch (error) {
    reportError(error)
  }
}

const updateNFT = async ({ id, cost }) => {  //cập nhật giá của một NFT bằng cách gửi giao dịch tới hợp đồng.
  try {
    cost = window.web3.utils.toWei(cost.toString(), 'ether')
    const contract = await getEtheriumContract()
    const buyer = getGlobalState('connectedAccount')

    await contract.methods.changePrice(Number(id), cost).send({ from: buyer })
  } catch (error) {
    reportError(error)
  }
}

const reportError = (error) => {
  setAlert(JSON.stringify(error), 'red')
}

export {
  getAllNFTs,
  connectWallet,
  mintNFT,
  buyNFT,
  updateNFT,
  isWallectConnected,
}
