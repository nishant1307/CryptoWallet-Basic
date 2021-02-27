// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.1;

contract Bank {

    mapping(address => uint256) private balanceOf;   // balances, indexed by addresses
    
    function deposit(uint256 amount) external payable {
        require(msg.value == amount);
        balanceOf[msg.sender] += amount;     // adjust the account's balance
    }

    function withdraw(uint256 amount) external {
        require(amount <= balanceOf[msg.sender]);
        balanceOf[msg.sender] -= amount;
        payable(msg.sender).transfer(amount);
    }
    
    function getBalance() external view returns(uint256) {
        return balanceOf[msg.sender];
    }
}