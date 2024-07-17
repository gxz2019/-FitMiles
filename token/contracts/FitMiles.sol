// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract FitMiles is ERC20, Ownable {
    mapping(address => uint256) public milesRecord;

    event MilesRecorded(address indexed user, uint256 miles);
    event TokensClaimed(address indexed user, uint256 amount);

    constructor() ERC20("FitMiles Token", "FIT") {}

    function recordMiles(uint256 _miles) external {
        require(_miles > 0, "Miles must be greater than zero");
        milesRecord[msg.sender] += _miles;
        emit MilesRecorded(msg.sender, _miles);
    }

    function claimTokens() external {
        uint256 miles = milesRecord[msg.sender];
        require(miles > 0, "No miles to claim");

        milesRecord[msg.sender] = 0;
        _mint(msg.sender, miles);
        emit TokensClaimed(msg.sender, miles);
    }

    function getClaimableMiles(address _user) external view returns (uint256) {
        return milesRecord[_user];
    }
}
