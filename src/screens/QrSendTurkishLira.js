import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import QRCodeScanner from 'react-native-qrcode-scanner';
import {ethers} from 'ethers';
import Header from '../components/Header';

const providerUrl = 'https://chain.scimatic.net'; // Update this

const QrSendTurkishLira = ({navigation}) => {
  const [recipientAddress, setRecipientAddress] = useState('');
  const [amount, setAmount] = useState('');
  const [isGeneratingQR, setIsGeneratingQR] = useState(false);
  const [qrCodeData, setQRCodeData] = useState('');
  const [loading, setLoading] = useState(false);

  // Generate QR Code for Payment
  const generateQRCode = () => {
    if (!ethers.isAddress(recipientAddress)) {
      Alert.alert('Invalid Address', 'Please enter a valid recipient address.');
      return;
    }

    if (isNaN(amount) || parseFloat(amount) <= 0) {
      Alert.alert('Invalid Amount', 'Please enter a valid amount.');
      return;
    }

    const paymentData = JSON.stringify({
      to: recipientAddress,
      value: amount,
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
          placeholder="Amount (TRY)"
          value={amount}
          onChangeText={setAmount}
          keyboardType="numeric"
        />
        <TouchableOpacity
          style={styles.button}
          onPress={generateQRCode}
          disabled={loading}>
          <Text style={styles.buttonText}>Generate QR Code</Text>
        </TouchableOpacity>
        {isGeneratingQR && (
          <View style={styles.qrCodeContainer}>
            <Text style={styles.qrLabel}>Scan to Pay:</Text>
            <QRCode value={qrCodeData} size={200} />
          </View>
        )}
        {loading && (
          <Text style={styles.loadingText}>Processing Payment...</Text>
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
  qrLabel: {
    fontSize: 18,
    marginBottom: 10,
    color: '#fff',
  },
  loadingText: {
    marginTop: 20,
    fontSize: 16,
    color: 'gray',
  },
});

export default QrSendTurkishLira;
