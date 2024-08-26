import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  Alert,
  TouchableOpacity,
} from 'react-native';
import {ethers} from 'ethers';
import Header from '../components/Header';

// Replace this with your actual provider URL
const providerUrl = 'https://chain.scimatic.net';
const turkishLiraTokenAddress = '0xbf9dAAe19dd4E346C9feC4aD4D2379ec632c05e1';

const TurkishLira = ({route, navigation}) => {
  const {tokenName} = route.params || {tokenName: 'Turkish Lira'};
  const [balance, setBalance] = useState(null);
  const [loading, setLoading] = useState(true);
  const [transactionInProgress, setTransactionInProgress] = useState(false);

  useEffect(() => {
    const fetchBalance = async () => {
      try {
        const provider = new ethers.JsonRpcProvider(providerUrl);
        const address = '0xC3b725Efd4Fb95325281B97baF9FCCC9F94D9672'; // Replace with the actual address

        // Instantiate the contract within the function
        const turkishLiraContract = new ethers.Contract(
          turkishLiraTokenAddress,
          [
            // ERC-20 ABI to interact with the balanceOf function
            'function balanceOf(address owner) view returns (uint256)',
          ],
          provider,
        );

        // Fetch the Turkish Lira token balance
        const tryBalanceInWei = await turkishLiraContract.balanceOf(address);
        const balanceInEth = ethers.formatUnits(tryBalanceInWei, 18);
        setBalance(balanceInEth);
      } catch (error) {
        console.error('Error fetching balance:', error.message);
        Alert.alert('Error', `Failed to fetch balance: ${error.message}`);
      } finally {
        setLoading(false);
      }
    };

    fetchBalance();
  }, []);

  const handleTransaction = () => {
    navigation.navigate('QrSendTurkishLira');
  };

  const handleReceive = () => {
    navigation.navigate('QrReceiveTurkishLira');
  };

  return (
    <View style={styles.container}>
      <Header
        title={'Turkish Lira'}
        icon={require('../images/back.png')}
        onPress={() => navigation.goBack()}
      />
      <View style={styles.section}>
        <Text style={styles.header}>{tokenName} Token Balance</Text>
        {loading ? (
          <ActivityIndicator size="large" color="#0000ff" />
        ) : (
          <Text style={styles.balanceText}>{balance} TRY</Text>
        )}
        <TouchableOpacity
          style={styles.transactionButton}
          onPress={handleTransaction}
          disabled={transactionInProgress}>
          <Text style={styles.transactionButtonText}>
            {transactionInProgress ? 'Processing...' : 'Send Token'}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.transactionButton}
          onPress={handleReceive}
          disabled={transactionInProgress}>
          <Text style={styles.transactionButtonText}>
            {transactionInProgress ? 'Processing...' : 'Receive Token'}
          </Text>
        </TouchableOpacity>
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
    padding: 20,
    marginTop: 100,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    alignContent: 'center',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  balanceText: {
    fontSize: 40,
    fontWeight: 'bold',
    marginBottom: 70,
  },
  transactionButton: {
    backgroundColor: 'green',
    padding: 20,
    borderRadius: 10,
    width: '75%',
    alignItems: 'center',
    alignSelf: 'center',
    marginVertical: 10,
    marginBottom: 30,
  },
  transactionButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default TurkishLira;
