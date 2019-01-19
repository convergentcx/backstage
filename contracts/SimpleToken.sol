pragma solidity ^0.4.24;

contract SimpleToken {
    uint totalSupply;
    address owner;

    mapping(address => uint) public balances;

    constructor(uint initialSupply) public {
        totalSupply = initialSupply;
        balances[owner] = initialSupply;
    }

    function transfer(uint256 howMuch, address toWho)
        public returns (bool)
    {
        balances[toWho] = howMuch;
    }
}
