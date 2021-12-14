// SPDX-License-Identifier: MIT
pragma solidity ^0.6.0;

import "./ItemManager.sol";

/*
    This smart contract is responsible for taking the payment and handling the payment back over to the item manager.
    So when we create an item, then we create a new instance of the contract item at this to extract.
    It still gets an identifier.
    It still gets an index in our mapping, but then the actual payment happens in the items smart contract.
    So every time we create a new smart contract, it gets its own address.
    And that is pretty cool and pretty convenient.
    
    Each smart contract get a separate Address
    
*/

contract Item{
    uint public priceInWei;
    uint public paidWei;
    uint public index;
    
    ItemManager parentContract;
    
    constructor(ItemManager _parentContract, uint _priceInWei, uint _index) public {
        priceInWei = _priceInWei;
        index = _index;
        parentContract = _parentContract;
    }
    
    receive() external payable{
        require(msg.value == priceInWei, "We don't supports partial payments");
        require(paidWei == 0, "Item is already paid.");
        paidWei += msg.value;
        //(bool success, ) = address(parentContract).call{value:msg.value}(abi.encodeWithSignature("triggerPayment(uint256)", index));
        (bool success, ) = address(parentContract).call.value(msg.value)(abi.encodeWithSignature("triggerPayment(uint256)", index));
        require(success, "Delievery did not work");
    }
    
    fallback() external{
        
    }
}