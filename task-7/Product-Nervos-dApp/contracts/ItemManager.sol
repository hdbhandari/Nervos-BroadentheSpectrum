// SPDX-License-Identifier: MIT
pragma solidity ^0.6.0;
import "./Ownable.sol";
import "./Item.sol";

/* https://ethereum-blockchain-developer.com/050-supply-chain-project/01-initial-itemsmanager */
contract ItemManager is Ownable {
    
    enum SupplyChainSteps {Created, Paid, Delievered}
    
    struct S_Item {
        Item _item;
        ItemManager.SupplyChainSteps _step;
        uint _itemPrice;
        string _identifier;
    }
    
    mapping(uint => S_Item) public items;
    uint index;
    
    event SupplyChainStep(uint _itemIndex, uint _step, address _address);
    
    function createItem(string memory _identifier, uint _priceInWei) public onlyOwner{
        Item item = new Item(this, _priceInWei, index);
        items[index]._item = item;
        items[index]._itemPrice = _priceInWei;
        items[index]._step = SupplyChainSteps.Created;
        items[index]._identifier = _identifier;
        emit SupplyChainStep(index, uint(items[index]._step), address(item));
        index++;
    }
    
    /*
        The param _index is for items[index] for which payment is triggered
    */
    function triggerPayment(uint _index) public payable{
        Item item = items[_index]._item;
        require(address(item) == msg.sender, "Only Items are allowed to update themselves");
        require(item.priceInWei()==msg.value,"Not fully paid yet!");
        require(items[_index]._step == SupplyChainSteps.Created, "Item is further in the supply chain");
        items[_index]._step = SupplyChainSteps.Paid;
        emit SupplyChainStep(_index, uint(items[_index]._step), address(item));
    }
    
    function triggerDelievery(uint _index) public onlyOwner{
        require(items[_index]._step == SupplyChainSteps.Paid, "Item is further in supply chain");
        items[_index]._step = SupplyChainSteps.Delievered;
        emit SupplyChainStep(_index, uint(items[_index]._step), address(items[_index]._item));
    }
}