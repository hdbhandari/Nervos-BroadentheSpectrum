import Web3 from "web3"
import { PolyjuiceHttpProvider } from "@polyjuice-provider/web3"

const createWeb3 = async () => {
  const CONFIG = {
    WEB3_PROVIDER_URL: "https://godwoken-testnet-web3-rpc.ckbapp.dev",
    ROLLUP_TYPE_HASH:
      "0x4cc2e6526204ae6a2e8fcf12f7ad472f41a1606d5b9624beebd215d780809f6a",
    ETH_ACCOUNT_LOCK_CODE_HASH:
      "0xdeec13a7b8e100579541384ccaf4b5223733e4a5483c3aec95ddc4c1d5ea5b22",
  }
  // Modern dapp browsers...
  if ((window as any).ethereum) {
    const godwokenRpcUrl = CONFIG.WEB3_PROVIDER_URL
    const providerConfig = {
      rollupTypeHash: CONFIG.ROLLUP_TYPE_HASH,
      ethAccountLockCodeHash: CONFIG.ETH_ACCOUNT_LOCK_CODE_HASH,
      web3Url: godwokenRpcUrl,
    }

    const provider = new PolyjuiceHttpProvider(godwokenRpcUrl, providerConfig)
    const web3 = new Web3(provider as any)

    try {
      // Request account access if needed
      await (window as any).ethereum.enable()
    } catch (error) {
      // User denied account access...
    }

    return web3
  }

  console.log(
    "Non-Ethereum browser detected. You should consider trying MetaMask!"
  )
  return null
}

export default createWeb3
