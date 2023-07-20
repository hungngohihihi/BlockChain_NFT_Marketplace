/* eslint-disable no-undef */
const openseeNFT = artifacts.require('openseeNFT')

module.exports = async (deployer) => {
  const accounts = await web3.eth.getAccounts()

  await deployer.deploy(openseeNFT, 'opensee NFTs', 'TNT', 10, accounts[1])
}
