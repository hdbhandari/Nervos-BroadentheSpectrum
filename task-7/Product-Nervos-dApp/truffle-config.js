const path = require("path")

module.exports = {
  // See <http://truffleframework.com/docs/advanced/configuration>
  // to customize your Truffle configuration!
  contracts_build_directory: path.join(__dirname, "client/src/contracts"),
  networks: {
    develop: {
      host: "127.0.0.1",
      port: 7545,
      network_id: "*"
    },
    ganache: {
      host: "127.0.0.1",
      port: 8545,
      network_id: "*"
    },
    nervos: {
      host: "https://godwoken-testnet-web3-rpc.ckbapp.dev",
      port: "443",
      network_id: "*"
    }
  },
  compilers: {
    solc: {
      version: "0.6.0"
    }
  }
}
