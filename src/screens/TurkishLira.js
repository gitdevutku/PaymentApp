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
import {useBalance} from '../BalanceContext';

const TurkishLira = ({route, navigation}) => {
  const {tokenName} = route.params || {tokenName: 'Turkish Lira'};
  const [transactionInProgress, setTransactionInProgress] = useState(false);
  const {ethBalance, tryBalance} = useBalance(); // Use context

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
        <Text style={styles.balanceText}>{tryBalance} TRY</Text>
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
