pragma solidity ^0.8.7;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";
import "./IMVPToken.sol";

contract MVPToken is ERC20, AccessControl, IMVPToken {
    bytes32 public constant ADMIN_ROLE = keccak256("ADMIN_ROLE");
    bytes32 public constant MINTER_ROLE = keccak256("MINTER_ROLE");

    constructor(address admin, uint256 initialSupply)
        public
        ERC20("MVP Token", "MVPT")
    {
        _mint(msg.sender, initialSupply);
        _setupRole(AccessControl.DEFAULT_ADMIN_ROLE, admin);
        _setupRole(MINTER_ROLE, admin);
    }

    function mint(address to, uint256 amount) external override {
        require(hasRole(MINTER_ROLE, msg.sender), "Caller is not a minter");
        _mint(to, amount);
    }

    function burn(address account, uint256 amount) external override {
        _burn(account, amount);
    }

    function burnFrom(address account, uint256 amount) external override {
        burn(account, amount);
    }
}
