// Developed by Kenth Fagerlund (https://github.com/arkalon76)

// contracts/SunblockToken.sol

// Developed by Kenth Fagerlund (https://github.com/arkalon76)
// Based on the fantastic work by Dogu Deniz UGUR (https://github.com/DoguD)

// contracts/sunblock.sol

// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract Tether is ERC20, ERC20Burnable, Ownable {
    constructor() ERC20("Tether", "USDT") {
        _mint(msg.sender, 10000000 * 10 ** decimals());
    }

    function mint(address to, uint256 amount) public onlyOwner {
        _mint(to, amount);
    }

   function decimals() public pure override returns (uint8) {
		return 6;
	}
}