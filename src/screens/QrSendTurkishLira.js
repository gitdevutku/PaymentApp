import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TextInput,
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
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';

const TOKEN_ADDRESS = '0xbf9dAAe19dd4E346C9feC4aD4D2379ec632c05e1'; // Replace with actual Turkish Lira Token contract address
const TOKEN_SYMBOL = 'TRY';

const QrSendTurkishLira = ({navigation, route}) => {
  const {recipientAddress: initialRecipientAddress, amount: initialAmount} =
    route.params || {};

  const [recipientAddress, setRecipientAddress] = useState(
    initialRecipientAddress || '',
  );
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

  const onScanSuccess = e => {
    // Assuming the scanned data contains the recipient's address in the format you need
    setRecipientAddress(e.data);
    setIsScanningQR(false); // Close the scanner after successful scan
  };

  return (
    <View style={styles.container}>
      <Header
        title={'QR Code Payment System'}
        icon={require('../images/back.png')}
        onPress={() => navigation.goBack()}
      />

      <View style={styles.section}>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Recipient Address"
            value={recipientAddress}
            onChangeText={setRecipientAddress}
            autoCapitalize="none"
          />

          {/* QR Code Scanner Icon Inside the TextInput */}
          <TouchableOpacity
            style={styles.qrIcon}
            onPress={() => setIsScanningQR(true)}>
            <FontAwesomeIcon icon="fa-sharp fa-light fa-qrcode" />
          </TouchableOpacity>
        </View>

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
          disabled={isGeneratingQR}>
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

      {/* QR Code Scanner Modal */}
      <Modal visible={isScanningQR} animationType="slide">
        <QRCodeScanner
          onRead={onScanSuccess}
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
    right: 15,
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

export default QrSendTurkishLira;
