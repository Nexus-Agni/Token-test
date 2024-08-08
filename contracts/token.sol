// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Token {
    string public name = "Agni's Token";
    string public symbol = "AGT";
    mapping (address => uint) balances;
    uint public totalSupply = 1000;
    address public owner; 
    
    constructor() {
        owner = msg.sender;
        balances[owner] = totalSupply;
    }

    function transfer (address to, uint amount) external {
        require(amount <= balances[msg.sender], "Insuffiecient funds");
        balances[msg.sender] -= amount;
        balances[to] += amount;
    }

    function balanceOf(address account) external view  returns (uint) {
        return balances[account];
    }
}