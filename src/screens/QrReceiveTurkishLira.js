import React, {useState} from 'react';
import {View, Text, StyleSheet, Alert, Modal, Pressable} from 'react-native';
import QRCodeScanner from 'react-native-qrcode-scanner';
import {ethers} from 'ethers';
import erc20Abi from '../erc20.abi.json'; // Adjust the path to your ABI file
import Header from '../components/Header';

// Hardcoded token details
const TOKEN_ADDRESS = '0xbf9dAAe19dd4E346C9feC4aD4D2379ec632c05e1'; // Replace with actual Turkish Lira Token contract address
const PRIVATE_KEY =
  '0xe1119699c0f01f7e18a6653be970854396692a00b5d188ab2373ec5fc6157696'; // Replace with your private key (ensure this is securely stored and not hard-coded)

const QrReceiveTurkishLira = ({navigation}) => {
  const [paymentData, setPaymentData] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleScan = async e => {
    try {
      const data = JSON.parse(e.data);
      const {to, amount, tokenAddress} = data;

      if (tokenAddress !== TOKEN_ADDRESS) {
        Alert.alert(
          'Invalid Token',
          'This QR code is not for the Turkish Lira Token.',
        );
        return;
      }

      // Set payment data and show confirmation dialog
      setPaymentData({to, amount});
      setIsModalVisible(true);
    } catch (error) {
      Alert.alert('Error', `Failed to process the QR code: ${error.message}`);
    }
  };

  const confirmPayment = async () => {
    if (!paymentData) return;

    const {to, amount} = paymentData;
    try {
      // Setup Ethereum provider and wallet
      const provider = new ethers.JsonRpcProvider('https://chain.scimatic.net');
      const wallet = new ethers.Wallet(PRIVATE_KEY, provider);

      // Create a contract instance for the Turkish Lira Token
      const tokenContract = new ethers.Contract(
        TOKEN_ADDRESS,
        erc20Abi,
        wallet,
      );

      // Convert amount to the correct units
      const decimals = 18; // Adjust if your token has a different decimal precision
      const amountInUnits = ethers.parseUnits(amount.toString(), decimals);

      // Perform the token transfer
      const tx = await tokenContract.transfer(to, amountInUnits);
      await tx.wait();

      // Navigate to Success screen
      navigation.navigate('Success');
      Alert.alert(
        'Success',
        `Successfully transferred ${amount} Turkish Lira Token to ${to}`,
      );
    } catch (error) {
      Alert.alert('Error', `Failed to process the payment: ${error.message}`);
    } finally {
      setIsModalVisible(false); // Hide the confirmation modal
    }
  };

  const cancelPayment = () => {
    setIsModalVisible(false); // Hide the confirmation modal
  };

  return (
    <View style={styles.container}>
      <Header
        title={'Scan the QR code'}
        icon={require('../images/back.png')}
        onPress={() => navigation.goBack()}
      />
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

      {/* Confirmation Modal */}
      <Modal transparent={true} visible={isModalVisible} animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Confirm Payment</Text>
            <Text style={styles.modalText}>
              Are you sure you want to transfer {paymentData?.amount} Turkish
              Lira Token to {paymentData?.to}?
            </Text>
            <View style={styles.modalButtons}>
              <Pressable style={styles.modalButton} onPress={confirmPayment}>
                <Text style={styles.modalButtonText}>Confirm</Text>
              </Pressable>
              <Pressable style={styles.modalButton} onPress={cancelPayment}>
                <Text style={styles.modalButtonText}>Cancel</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#90EE90',
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
    marginTop: 20,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    width: '80%',
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  modalText: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: 'center',
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  modalButton: {
    flex: 1,
    marginHorizontal: 10,
    padding: 10,
    borderRadius: 5,
    backgroundColor: 'green',
    alignItems: 'center',
  },
  modalButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default QrReceiveTurkishLira;
