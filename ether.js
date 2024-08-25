const ethers = require('ethers');
const provider = new ethers.JsonRpcProvider('https://chain.scimatic.net');
const private_key =
  '0xe1119699c0f01f7e18a6653be970854396692a00b5d188ab2373ec5fc6157696';

const wallet = new ethers.Wallet(private_key, provider);

const fetchBalance = async walletAddress => {
  try {
    const balance = await provider.getBalance(walletAddress);
    const ethValue = ethers.formatEther(balance);
    console.log('Balance:', ethValue);
    return ethValue;
  } catch (error) {
    console.error('Error fetching balance:', error);
    return '0';
  }
};
export {fetchBalance};
