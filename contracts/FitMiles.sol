// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract FitMiles is ERC20 {
    address public owner;
    mapping(address => uint256) public milesRecord;

    event MilesRecorded(address indexed user, uint256 miles);

    constructor() ERC20("FitMiles Token", "FIT") {
        owner = msg.sender;
    }

    function recordMiles(uint256 _miles) external {
        require(_miles > 0, "Miles must be greater than zero");
        _mint(msg.sender, _miles);
        milesRecord[msg.sender] += _miles;
        emit MilesRecorded(msg.sender, _miles);
    }
}
