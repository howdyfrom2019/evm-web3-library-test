// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@thirdweb-dev/contracts/eip/ERC721A.sol";
import "@thirdweb-dev/contracts/eip/interface/IERC721Enumerable.sol";
import "@thirdweb-dev/contracts/extension/interface/IBurnableERC721.sol";
import "@thirdweb-dev/contracts/extension/Ownable.sol";
 
contract Contract is ERC721A, IBurnableERC721, IERC721Enumerable, Ownable {
    uint256 public mintPrice = 0.0001 ether;
    uint256 public whitelistPrice = 0.00005 ether;
    address public constant GENESIS = address(0);
    mapping(address => bool) public whitelist;

    constructor(
        string memory _name,
        string memory _symbol
    )
        ERC721A(
            _name,
            _symbol
        )
    {}

    // Mint function for whitelist and public users
    function mint(uint256 quantity) external payable {
        require(quantity > 0, "Quantity must be greater than 0");
        uint256 price = whitelist[msg.sender] ? whitelistPrice : mintPrice;
        require(msg.value >= price * quantity, "Insufficient funds");

        _safeMint(msg.sender, quantity);
    }

    function tokenByIndex(uint256 _index) external view override returns (uint256) {
        // Your custom implementation here
        require(_index < totalSupply(), "Index out of bounds");
        return _index;
    }
 
    function tokenOfOwnerByIndex(address _owner, uint256 _index) external view override returns (uint256) {
        // Your custom implementation here
        require(_index < balanceOf(_owner), "Index out of bounds");
        uint256 tokenId;
        uint256 count;
        
        for (uint256 i = 0; i < totalSupply(); i++) {
            if (ownerOf(i) == _owner) {
                if (count == _index) {
                    tokenId = i;
                    break;
                }
                count++;
            }
        }

        return tokenId;
    }

    function burn(uint256 tokenId) external {
        // Your custom implementation here
        require(ownerOf(tokenId) == msg.sender, "Not the owner of the token");
        _burn(tokenId);
    }

    // Function to set addresses for whitelist
    function setWhitelist(address[] calldata addresses, bool status) external onlyOwner {
        for (uint256 i = 0; i < addresses.length; i++) {
            whitelist[addresses[i]] = status;
        }
    }

    // Function to withdraw the contract balance
    function withdraw() external onlyOwner {
        payable(owner()).transfer(address(this).balance);
    }

    function setWhiteList(address[] calldata addresses, bool status) external onlyOwner {
        for (uint256 i = 0; i < addresses.length; i++) {
            whitelist[addresses[i]] = status;
        }
    }

    function _canSetOwner() internal virtual view override returns (bool) {
        return msg.sender == owner();
    }
}