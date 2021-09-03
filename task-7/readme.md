# About

Task submission of "Gitcoin: 7) Port An Existing Ethereum DApp To Polyjuice" from the Hackathon: Nervos - Broaden the Spectrum at [https://gitcoin.co/issue/nervosnetwork/grants/8/100026214]

Following are added:

## 1) Screenshots or video of your application running on Godwoken

### 1 Initial Page

![Products-dApp-1.png](https://github.com/hdbhandari/Nervos-BroadentheSpectrum/blob/master/task-7/screen-shots/Products-dApp-1.png)

### We need to click on "Load Products" to load existing products

![Products-dApp-2.png](https://github.com/hdbhandari/Nervos-BroadentheSpectrum/blob/master/task-7/screen-shots/Products-dApp-2.png)

### Fetching Products

![Products-dApp-3.png](https://github.com/hdbhandari/Nervos-BroadentheSpectrum/blob/master/task-7/screen-shots/Products-dApp-3.png)

### All the products listed

![Products-dApp-4.png](https://github.com/hdbhandari/Nervos-BroadentheSpectrum/blob/master/task-7/screen-shots/Products-dApp-4.png)

### After clicking on "Create New Item" Godwoken Signature Request Confirmation from MetaMask

![Products-dApp-5.png](https://github.com/hdbhandari/Nervos-BroadentheSpectrum/blob/master/task-7/screen-shots/Products-dApp-5.png)

### After signing the transaction, it will load all the products

![Products-dApp-6.png](https://github.com/hdbhandari/Nervos-BroadentheSpectrum/blob/master/task-7/screen-shots/Products-dApp-6.png)

### Newly added Product added to the Table

![Products-dApp-7.png](https://github.com/hdbhandari/Nervos-BroadentheSpectrum/blob/master/task-7/screen-shots/Products-dApp-7.png)

## 2) Link to the GitHub repository with your application which has been ported to Godwoken

## 3) If you deployed any smart contracts as part of this tutorial, please provide the transaction hash of the deployment transaction, the deployed contract address, and the ABI of the deployed smart contract. (Provide all in text format.)

2 Smart Contracts are deployed:

### Transaction hash(ItemManager.json)

0xdaee205e01bf85dfcdc863e0f1f6ec888c8f6d84c3addc667263a6d07892baa3

### Deployed contract address(ItemManager.json)

0x1bd4926F237Da8aD226917626875C559E8A6E1Db

### ABI(ItemManager.json)

[{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"_itemIndex","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"_step","type":"uint256"},{"indexed":false,"internalType":"address","name":"_address","type":"address"}],"name":"SupplyChainStep","type":"event"},{"inputs":[],"name":"\_owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"isOwner","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"items","outputs":[{"internalType":"contract Item","name":"_item","type":"address"},{"internalType":"enum ItemManager.SupplyChainSteps","name":"_step","type":"uint8"},{"internalType":"uint256","name":"_itemPrice","type":"uint256"},{"internalType":"string","name":"_identifier","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"string","name":"_identifier","type":"string"},{"internalType":"uint256","name":"_priceInWei","type":"uint256"}],"name":"createItem","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_index","type":"uint256"}],"name":"triggerPayment","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_index","type":"uint256"}],"name":"triggerDelievery","outputs":[],"stateMutability":"nonpayable","type":"function"}]

### Transaction hash(Item.json)

0x9e54f622f94aeee4642515914dd112460039fdc2875c568f32b57ad1b46ed145

### Deployed contract address(Item.json)

0x83616D6E3debf1860D3480B2556EF246f83C01fd

### ABI(Item.json)

[{"inputs":[{"internalType":"contract ItemManager","name":"_parentContract","type":"address"},{"internalType":"uint256","name":"_priceInWei","type":"uint256"},{"internalType":"uint256","name":"_index","type":"uint256"}],"stateMutability":"nonpayable","type":"constructor"},{"stateMutability":"nonpayable","type":"fallback"},{"inputs":[],"name":"index","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"paidWei","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"priceInWei","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"stateMutability":"payable","type":"receive"}]
