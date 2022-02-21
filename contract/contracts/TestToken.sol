pragma solidity ^0.8.7;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract TestToken is ERC20 {
    uint256 constant _initialSupply = 100000;

    constructor() public ERC20("Test Token", "TT") {
        _mint(msg.sender, _initialSupply);
    }
}
