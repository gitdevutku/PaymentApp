import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TextInput,
  Image,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Platform,
  Modal,
} from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import {ethers} from 'ethers';
import Header from '../components/Header';
import QRCodeScanner from 'react-native-qrcode-scanner';
import {convertCommaToDot} from '../utils/numberUtils.js';

// SCI Token Address
const TOKEN_SYMBOL = 'SCI'; // SCI Coin Symbol
const SCI_DECIMALS = 18; // Usually ERC20 tokens have 18 decimals, adjust if needed
const private_key =
  '0xe1119699c0f01f7e18a6653be970854396692a00b5d188ab2373ec5fc6157696';
const QrSendSciCoin = ({navigation, route}) => {
  const {recipientAddress: initialRecipientAddress, amount: initialAmount} =
    route.params || {};

  const [target, setRecipientAddress] = useState(initialRecipientAddress || '');
  const [amount, setAmount] = useState(initialAmount || '');
  const [isGeneratingQR, setIsGeneratingQR] = useState(false);
  const [qrCodeData, setQRCodeData] = useState('');
  const [isScanningQR, setIsScanningQR] = useState(false); // State for managing QR scanner visibility

  useEffect(() => {
    if (initialRecipientAddress && initialAmount) {
      generateQRCode();
    }
  }, [initialRecipientAddress, initialAmount]);

  const validateInputs = () => {
    if (!ethers.isAddress(target)) {
      Alert.alert('Invalid Address', 'Please enter a valid recipient address.');
      return false;
    }
    if (isNaN(amount) || parseFloat(amount) <= 0) {
      Alert.alert('Invalid Amount', 'Please enter a valid amount.');
      return false;
    }

    return true;
  };

  const generateQRCode = () => {
    if (!validateInputs()) return;

    const paymentData = JSON.stringify({
      to: recipientAddress,
      amount: amount,
      tokenAddress: target,
      tokenSymbol: TOKEN_SYMBOL,
    });

    setQRCodeData(paymentData);
    setIsGeneratingQR(true);
  };

  const onScanSuccess = e => {
    try {
      // First, try to treat the scanned data as a valid Ethereum address
      if (ethers.isAddress(e.data)) {
        setRecipientAddress(e.data);
      } else {
        // If it's not a valid address, try to parse it as JSON (in case it's a more complex QR code)
        const data = JSON.parse(e.data);

        if (ethers.isAddress(data.to)) {
          setRecipientAddress(data.to);
        } else {
          Alert.alert(
            'Invalid Data',
            'QR code does not contain a valid address.',
          );
        }
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to parse QR code data.');
    }
    // Close the scanner after processing
    setIsScanningQR(false);
  };

  const handleAmountChange = input => {
    const formattedAmount = convertCommaToDot(input);
    setAmount(formattedAmount);
  };

  // Function to send SCI coins
  const sendSciCoins = async () => {
    if (!validateInputs()) return;

    try {
      const provider = new ethers.JsonRpcProvider('https://chain.scimatic.net');
      const wallet = new ethers.Wallet(private_key, provider);

      // Create contract instance for SCI token
      const sciTokenContract = new ethers.Contract(
        target, // This should be the token address
        ['function transfer(address to, uint256 amount) public returns (bool)'], // Ensure the ABI is correct
        wallet, // Use the wallet with the private key
      );

      // Convert amount to SCI's decimal units
      const amountInUnits = ethers.parseUnits(amount, SCI_DECIMALS);

      // Send SCI tokens
      const transaction = await sciTokenContract.transfer(
        target, // This should be the recipient address
        amountInUnits,
      );

      // Wait for transaction to be mined
      await transaction.wait();

      // Log transaction hash for confirmation
      console.log('Transaction hash:', transaction.hash);

      // Show success alert
      Alert.alert('Success', `Transaction sent. Hash: ${transaction.hash}`);
    } catch (error) {
      console.error('Transaction failed:', error);
      Alert.alert('Error', 'Transaction failed. Please try again.');
    }
  };

  return (
    <View style={styles.container}>
      <Header
        title={'SCI Coin Payment System'}
        icon={require('../images/back.png')}
        onPress={() => navigation.goBack()}
      />

      <View style={styles.section}>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Recipient Address"
            value={target}
            onChangeText={setRecipientAddress}
            autoCapitalize="none"
          />

          {/* QR Code Scanner Icon Inside the TextInput */}
          <TouchableOpacity
            style={styles.qrIcon}
            onPress={() => setIsScanningQR(true)}>
            <Image
              style={{height: 24, width: 24}}
              source={require('../images/qr-code.256x256.png')}
            />
          </TouchableOpacity>
        </View>

        <TextInput
          style={styles.input}
          placeholder="Amount (SCI)"
          value={amount}
          onChangeText={handleAmountChange}
          keyboardType="numeric"
        />

        <TouchableOpacity style={styles.button} onPress={sendSciCoins}>
          <Text style={styles.buttonText}>Transfer SCI Coin</Text>
        </TouchableOpacity>

        {isGeneratingQR && (
          <View style={styles.qrCodeContainer}>
            <Text style={styles.qrLabel}>Scan to Pay:</Text>
            <View style={styles.qrCodeWrapper}>
              <QRCode value={qrCodeData} size={200} />
            </View>
          </View>
        )}
      </View>

      {/* QR Code Scanner Modal */}
      <Modal visible={isScanningQR} animationType="slide">
        <QRCodeScanner
          onRead={onScanSuccess}
          reactivate={true} // Optional: allows reactivation after a successful scan
          showMarker={true} // Optional: shows a marker to help position the QR code
          topContent={<Text style={styles.scannerText}>Scan the QR code</Text>}
          bottomContent={
            <TouchableOpacity
              style={styles.button}
              onPress={() => setIsScanningQR(false)}>
              <Text style={styles.buttonText}>Cancel</Text>
            </TouchableOpacity>
          }
        />
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#90EE90',
  },
  section: {
    marginTop: 200,
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputContainer: {
    width: '90%',
    position: 'relative',
  },
  input: {
    height: 50,
    borderColor: '#fff',
    backgroundColor: '#fff',
    borderWidth: 1,
    width: '90%',
    marginBottom: 20,
    paddingHorizontal: 10,
    borderRadius: 20,
  },
  qrIcon: {
    position: 'absolute',
    right: 0,
    top: 12,
  },
  button: {
    backgroundColor: 'green',
    padding: 10,
    borderRadius: 10,
    width: '60%',
    alignItems: 'center',
    marginVertical: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  qrCodeContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  qrCodeWrapper: {
    borderRadius: 10,
    overflow: 'hidden',
    padding: 10,
    backgroundColor: '#fff',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.3,
        shadowRadius: 4,
      },
      android: {
        elevation: 5,
      },
    }),
  },
  qrLabel: {
    fontSize: 18,
    marginBottom: 10,
    color: '#fff',
  },
  scannerText: {
    fontSize: 16,
    color: '#000',
    textAlign: 'center',
    marginVertical: 20,
  },
});

export default QrSendSciCoin;
