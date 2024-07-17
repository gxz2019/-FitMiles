#!/usr/bin/env

const { Command} = require('commander');
const { ethers } = require('ethers');

// ERC-20 合约的 ABI
const erc20Abi = [
  "function balanceOf(address owner) view returns (uint256)",
  "function getClaimableMiles(address user) view returns (uint256)",
];

// 创建 CLI 程序
const program = new Command();

program
  .version('1.0.0')
  .description('CLI tool for FitMiles token');

// 添加查询代币余额的命令
program
  .command('balance')
  .requiredOption('-w, --wallet <address>', 'Wallet address to query')
  .requiredOption('-c, --contract <address>', 'Token contract address')
  .description('Query the token balance of a wallet')
  .action(async (cmd) => {
    try {
      const { wallet, contract } = cmd;
      
      // 创建以太坊提供程序
      const provider = new ethers.providers.JsonRpcProvider('https://mainnet.infura.io/v3/YOUR_INFURA_PROJECT_ID');
      
      // 创建合约实例
      const contractInstance = new ethers.Contract(contract, erc20Abi, provider);

      // 查询代币余额
      const balance = await contractInstance.balanceOf(wallet);

      // 将余额转换为可读格式（假设代币有18位小数）
      console.log(`Balance of ${wallet}: ${ethers.utils.formatUnits(balance, 18)} tokens`);
    } catch (error) {
      console.error('Error fetching token balance:', error);
    }
  });

// 添加查询可领取代币的命令
program
  .command('claimable')
  .requiredOption('-w, --wallet <address>', 'Wallet address to query')
  .requiredOption('-c, --contract <address>', 'Token contract address')
  .description('Query the claimable tokens of a wallet')
  .action(async (cmd) => {
    try {
      const { wallet, contract } = cmd;
      
      // 创建以太坊提供程序
      const provider = new ethers.providers.JsonRpcProvider('https://mainnet.infura.io/v3/YOUR_INFURA_PROJECT_ID');
      
      // 创建合约实例
      const contractInstance = new ethers.Contract(contract, erc20Abi, provider);

      // 查询可领取的代币
      const claimableMiles = await contractInstance.getClaimableMiles(wallet);

      // 将可领取的代币数转换为可读格式（假设代币有18位小数）
      console.log(`Claimable Miles for ${wallet}: ${ethers.utils.formatUnits(claimableMiles, 18)} tokens`);
    } catch (error) {
      console.error('Error fetching claimable tokens:', error);
    }
  });

// 解析命令行参数
program.parse(process.argv);
