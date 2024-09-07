import React, {createContext, useContext, useEffect, useState} from 'react';
import {ethers} from 'ethers';

const BalanceContext = createContext();

export const useBalance = () => {
  return useContext(BalanceContext);
};

export const BalanceProvider = ({children}) => {
  const [ethBalance, setEthBalance] = useState(null);
  const [tryBalance, setTryBalance] = useState(null);

  const fetchBalance = async () => {
    try {
      const turkishLiraTokenAddress =
        '0xbf9dAAe19dd4E346C9feC4aD4D2379ec632c05e1';
      const provider = new ethers.JsonRpcProvider('https://chain.scimatic.net');
      const walletAddress = '0xC3b725Efd4Fb95325281B97baF9FCCC9F94D9672';

      // Fetch Ethereum balance
      const ethBalanceInWei = await provider.getBalance(walletAddress);
      setEthBalance(ethers.formatUnits(ethBalanceInWei, 18));

      // Fetch Turkish Lira balance
      const turkishLiraContract = new ethers.Contract(
        turkishLiraTokenAddress,
        ['function balanceOf(address owner) view returns (uint256)'],
        provider,
      );
      const tryBalanceInWei = await turkishLiraContract.balanceOf(
        walletAddress,
      );
      setTryBalance(ethers.formatUnits(tryBalanceInWei, 18));
    } catch (error) {
      console.error('Error fetching balance:', error);
    }
  };

  useEffect(() => {
    fetchBalance();
  }, []);

  return (
    <BalanceContext.Provider value={{ethBalance, tryBalance, fetchBalance}}>
      {children}
    </BalanceContext.Provider>
  );
};
