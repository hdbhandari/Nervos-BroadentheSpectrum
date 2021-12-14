import { useEffect, useState } from "react"
import ItemManager from "./contracts/ItemManager.json"
import createWeb3 from "./createWeb3"
// import Item from "./contracts/Item.json"
// import { AddressTranslator } from "nervos-godwoken-integration"

const App = () => {
  enum SupplyChainSteps {
    Created,
    Paid,
    Delievered,
  }
  const [cost, setCost] = useState<string>("2000")
  const [itemName, setItemName] = useState<string>("Product-2")
  const [loaded, setLoaded] = useState<boolean>(false)
  // const [web3, setWeb3] = useState<any>(null)
  const [itemManager, setItemManager] = useState<any>(null)
  const [accounts, setAccounts] = useState<any>(null)
  const [products, setProducts] = useState<any>([])
  // const [item, setItem] = useState<any>(null)
  const [loadingProducts, setLoadingProducts] = useState<boolean>(false)

  const loadEverything = async () => {
    const ITEM_MANAGER_CONTRACT_ADDRESS =
      "0x1bd4926F237Da8aD226917626875C559E8A6E1Db"

    try {
      // Get network provider and web3 instance.
      const web3 = await createWeb3()
      // setWeb3(web3)

      // Use web3 to get the user's accounts.
      // const accounts = await web3.eth.getAccounts()
      const accounts = [window.ethereum.selectedAddress]
      console.log("accounts: " + accounts)
      // Get the contract instance.

      if (web3 !== null) {
        const networkId = await web3.eth.net.getId()
        console.log("networkId: " + networkId)
        const itemManager = new web3.eth.Contract(
          ItemManager.abi as any,
          ITEM_MANAGER_CONTRACT_ADDRESS
        )

        /* 
        const ITEM_CONTRACT_ADDRESS = "0x83616D6E3debf1860D3480B2556EF246f83C01fd"
        const itemContract = new web3.eth.Contract(
          Item.abi as any,
          ITEM_CONTRACT_ADDRESS
        ) 
        setItem(itemContract)
        */

        setItemManager(itemManager)
        setAccounts(accounts)
        listenToPaymentEvent()
        loadProducts()
        setLoaded(true)
        let godwokenAddress = await itemManager.methods._owner().call()
        console.log("Owner is(godwokenAddress): " + godwokenAddress)
        /* const addressTranslator = new AddressTranslator()
        const ethAddr =
          addressTranslator.ethAddressToCkbAddress(godwokenAddress)
        console.log("ethAddr: " + ethAddr) */
      }
    } catch (error) {
      // Catch any errors for any of the above operations.
      alert(
        `Failed to load web3, accounts, or contract. Check console for details.`
      )
      console.error(error)
    }
  }

  useEffect(() => {
    loadEverything()
  }, [])

  const listenToPaymentEvent = () => {
    if (itemManager !== null) {
      itemManager.events
        .SupplyChainStep()
        .on("data", async function (evt: any) {
          if (evt.returnValues._step === 1) {
            let item = await itemManager.methods
              .items(evt.returnValues._itemIndex)
              .call()
            console.log("item: " + item)
            alert("Item " + item._identifier + " was paid, deliver it now!")
          }
          console.log("evt: " + evt)
        })
    }
  }

  const handleSubmit = async () => {
    const result = await itemManager.methods
      .createItem(itemName, cost)
      .send({ from: accounts[0], gas: 6000000 })
    console.log("result: " + result)
    loadProducts()
    /* alert("Send " +cost +" Wei to: " +result.events.SupplyChainStep.returnValues._address) */
  }

  /* Get all the Products Details */
  const loadProducts = async () => {
    setLoadingProducts(true)
    if (itemManager !== null) {
      let result
      let i = 0
      let retrievedProducts: any = []
      do {
        result = await itemManager.methods.items(i).call()
        i++
        if (result._identifier !== "") {
          retrievedProducts.push(result)
        }
      } while (result._item !== "0x0000000000000000000000000000000000000000")
      setProducts(retrievedProducts)
    }
    setLoadingProducts(false)
  }

  return (
    <div className="App">
      {!loaded ? (
        <h1>Loading</h1>
      ) : (
        <div>
          <h1>Products Add</h1>
          <strong>Cost: </strong>
          <input
            type="number"
            name="cost"
            value={cost}
            onChange={(e) => setCost(e.target.value)}
          />{" "}
          <strong>Item Name: </strong>
          <input
            type="text"
            name="itemName"
            value={itemName}
            onChange={(e) => setItemName(e.target.value)}
          />
          <button type="button" onClick={handleSubmit}>
            Create New Item
          </button>
          <hr />
        </div>
      )}

      <div id="wrapper">
        <h1>Available Products</h1>

        <table id="keywords" cellSpacing="0" cellPadding="0">
          <thead>
            <tr>
              <th>
                <span>Name</span>
              </th>
              <th>
                <span>Product Address</span>
              </th>
              <th>
                <span>Status</span>
              </th>
              <th>
                <span>Amount</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {products.map((product: any) => (
              <tr key={Math.random()}>
                <td className="lalign">{product._identifier}</td>
                <td>{product._item}</td>
                {/* <td>(SupplyChainSteps{product._step})</td> */}
                <td>{SupplyChainSteps[product._step]}</td>
                <td>{product._itemPrice}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {loadingProducts ? (
        <div className="lds-dual-ring"></div>
      ) : (
        <button className="btn" onClick={loadProducts}>
          Load Products
        </button>
      )}
    </div>
  )
}

export default App
