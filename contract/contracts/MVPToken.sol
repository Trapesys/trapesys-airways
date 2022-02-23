pragma solidity ^0.8.7;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "./IMVPToken.sol";

// For now, no access control for Bridge
contract MVPToken is ERC20, IMVPToken {
    constructor(address admin, uint256 initialSupply)
        public
        ERC20("MVP Token", "MVPT")
    {
        _mint(msg.sender, initialSupply);
    }

    function mint(address to, uint256 amount) external override {
        _mint(to, amount);
    }

    function burn(address account, uint256 amount) external override {
        _burn(account, amount);
    }

    function burnFrom(address account, uint256 amount) external override {
        _burn(account, amount);
    }
}
