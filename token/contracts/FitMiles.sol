// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract FitMiles is ERC20, Ownable {
    uint256 public constant MAX_SUPPLY = 1000000 * 10 ** 18;  // 最大供应量
    uint256 public constant HALVING_INTERVAL = 10000 * 10 ** 18;  // 每次减半的代币数量阈值
    uint256 public constant INITIAL_REWARD = 5 * 10 ** 18;  // 初始奖励数量

    uint256 public currentReward = INITIAL_REWARD;  // 当前奖励数量
    uint256 public totalMinted;  // 已发放的总代币数量

    mapping(address => uint256) public milesRecord;
    mapping(address => uint256) public lastRecordedBlock;  // 记录每个地址上次记录的区块号

    event MilesRecorded(address indexed user, uint256 miles);
    event TokensClaimed(address indexed user, uint256 amount);

    constructor() ERC20("FitMiles Token", "FIT") {}

    function recordMiles(uint256 _miles) external {
        require(_miles > 0, "Miles must be greater than zero");
        require(block.number != lastRecordedBlock[msg.sender], "Can only record miles once per block");

        milesRecord[msg.sender] += _miles;
        lastRecordedBlock[msg.sender] = block.number;  // 更新上次记录的区块号

        uint256 tokensToMint = _miles * currentReward / (5 * 10 ** 18);  // 根据当前奖励计算应发放的代币数量

        // 确保不会超过单次奖励最大值和总供应量
        if (tokensToMint > currentReward) {
            tokensToMint = currentReward;
        }
        if (totalMinted + tokensToMint > MAX_SUPPLY) {
            tokensToMint = MAX_SUPPLY - totalMinted;
        }

        totalMinted += tokensToMint;
        _mint(address(this), tokensToMint);  // 将代币发放给合约自身

        // 检查是否达到减半阈值
        if (totalMinted >= HALVING_INTERVAL * (MAX_SUPPLY / HALVING_INTERVAL - currentReward / INITIAL_REWARD + 1)) {
            currentReward /= 2;  // 奖励减半
        }

        emit MilesRecorded(msg.sender, _miles);
    }

    function claimTokens(uint256 _amount) external {
        uint256 claimableMiles = milesRecord[msg.sender];
        require(claimableMiles > 0, "No miles to claim");
        require(_amount <= claimableMiles, "Amount exceeds claimable miles");

        milesRecord[msg.sender] -= _amount;
        _transfer(address(this), msg.sender, _amount);  // 将代币从合约转移给用户

        emit TokensClaimed(msg.sender, _amount);
    }

    function getClaimableMiles(address _user) external view returns (uint256) {
        return milesRecord[_user];
    }
}
