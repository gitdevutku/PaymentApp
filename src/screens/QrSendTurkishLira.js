import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Platform,
} from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import {ethers} from 'ethers';
import Header from '../components/Header';

// Hardcoded token details
const TOKEN_ADDRESS = '0xbf9dAAe19dd4E346C9feC4aD4D2379ec632c05e1'; // Replace with actual Turkish Lira Token contract address
const TOKEN_SYMBOL = 'TRY'; // Replace with actual symbol if needed

const QrSendTurkishLira = ({navigation}) => {
  const [recipientAddress, setRecipientAddress] = useState('');
  const [amount, setAmount] = useState('');
  const [isGeneratingQR, setIsGeneratingQR] = useState(false);
  const [qrCodeData, setQRCodeData] = useState('');

  const validateInputs = () => {
    if (!ethers.isAddress(recipientAddress)) {
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
      tokenAddress: TOKEN_ADDRESS,
      tokenSymbol: TOKEN_SYMBOL,
    });

    setQRCodeData(paymentData);
    setIsGeneratingQR(true);
  };

  return (
    <View style={styles.container}>
      <Header
        title={'QR Code Payment System'}
        icon={require('../images/back.png')}
        onPress={() => navigation.goBack()}
      />

      <View style={styles.section}>
        <TextInput
          style={styles.input}
          placeholder="Recipient Address"
          value={recipientAddress}
          onChangeText={setRecipientAddress}
          autoCapitalize="none"
        />

        <TextInput
          style={styles.input}
          placeholder="Amount (TL)"
          value={amount}
          onChangeText={setAmount}
          keyboardType="numeric"
        />

        <TouchableOpacity
          style={styles.button}
          onPress={generateQRCode}
          disabled={false}>
          <Text style={styles.buttonText}>Generate QR Code</Text>
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
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#aeae',
  },
  section: {
    marginTop: 200,
    justifyContent: 'center',
    alignItems: 'center',
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
  button: {
    backgroundColor: 'green',
    padding: 10,
    borderRadius: 10,
    width: '80%',
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
});

export default QrSendTurkishLira;
