pragma solidity ^0.8.7;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";
import "@openzeppelin/contracts/utils/introspection/IERC165.sol";
import "./IMVPFlightTicket.sol";

contract MVPFlightTicket is ERC721, AccessControl, IMVPFlightTicket {
    bytes32 public constant MINTER_ROLE = keccak256("MINTER_ROLE");
    bytes32 public constant BURNER_ROLE = keccak256("BURNER_ROLE");

    constructor(address admin) public ERC721("MVP Flight Ticket", "MVPFT") {
        _setupRole(AccessControl.DEFAULT_ADMIN_ROLE, admin);
        _setupRole(MINTER_ROLE, admin);
        _setupRole(BURNER_ROLE, admin);
    }

    function mint(address to, uint256 tokenId) external override {
        require(hasRole(MINTER_ROLE, msg.sender), "Caller is not a minter");
        _mint(to, tokenId);
    }

    function burn(uint256 tokenId) external override {
        require(hasRole(BURNER_ROLE, msg.sender), "Caller is not a burner");
        _burn(tokenId);
    }

    function supportsInterface(bytes4 interfaceId)
        public
        view
        override(IERC165, ERC721, AccessControl)
        returns (bool)
    {
        return
            ERC721(address(this)).supportsInterface(interfaceId) ||
            AccessControl(address(this)).supportsInterface(interfaceId);
    }
}
