import React from 'react';
import {View, Text, StyleSheet, Alert} from 'react-native';
import QRCodeScanner from 'react-native-qrcode-scanner';
import {ethers} from 'ethers';
import erc20Abi from '../erc20.abi.json'; // Adjust the path to your ABI file

// Hardcoded token details
const TOKEN_ADDRESS = '0xbf9dAAe19dd4E346C9feC4aD4D2379ec632c05e1'; // Replace with actual Turkish Lira Token contract address
const PRIVATE_KEY =
  '0xe1119699c0f01f7e18a6653be970854396692a00b5d188ab2373ec5fc6157696'; // Replace with your private key (ensure this is securely stored and not hard-coded)

const QrReceiveTurkishLira = () => {
  const handleScan = async e => {
    try {
      const paymentData = JSON.parse(e.data);

      // Extract payment details
      const {to, amount, tokenAddress} = paymentData;

      if (tokenAddress !== TOKEN_ADDRESS) {
        Alert.alert(
          'Invalid Token',
          'This QR code is not for the Turkish Lira Token.',
        );
        return;
      }

      // Setup Ethereum provider and wallet
      const provider = new ethers.JsonRpcProvider('https://chain.scimatic.net');
      const wallet = new ethers.Wallet(PRIVATE_KEY, provider);

      // Create a contract instance for the Turkish Lira Token
      const tokenContract = new ethers.Contract(tokenAddress, erc20Abi, wallet);

      // Convert amount to the correct units
      const decimals = 18; // Adjust if your token has a different decimal precision
      const amountInUnits = ethers.parseUnits(amount.toString(), decimals);

      // Perform the token transfer
      const tx = await tokenContract.transfer(to, amountInUnits);
      await tx.wait();

      Alert.alert(
        'Success',
        `Successfully transferred ${amount} Turkish Lira Token to ${to}`,
      );
    } catch (error) {
      Alert.alert('Error', `Failed to process the payment: ${error.message}`);
    }
  };

  return (
    <View style={styles.container}>
      <QRCodeScanner
        onRead={handleScan}
        topContent={
          <Text style={styles.centerText}>
            Scan the QR code to receive Turkish Lira Token
          </Text>
        }
        bottomContent={
          <Text style={styles.buttonText}>
            Make sure the QR code is for Turkish Lira Token
          </Text>
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#aeae',
  },
  centerText: {
    flex: 1,
    fontSize: 18,
    padding: 32,
    color: 'blue',
  },
  buttonText: {
    fontSize: 21,
    color: 'red',
  },
});

export default QrReceiveTurkishLira;
