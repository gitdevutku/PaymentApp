import React, {useState, useEffect, useRef} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
  FlatList,
  Alert,
  Dimensions,
  Animated,
  Modal,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Header from '../components/Header';
import {useBalance} from '../BalanceContext';
import Icon from '@react-native-vector-icons/ionicons';

// Function to load the transaction history
const loadTransactionHistory = async () => {
  try {
    const history = await AsyncStorage.getItem('transaction_history_sci');
    return history ? JSON.parse(history) : [];
  } catch (error) {
    console.error('Error loading transaction history:', error);
    return [];
  }
};

// Function to add a new transaction to the history
const addTransaction = async transaction => {
  try {
    const history = await loadTransactionHistory();
    history.push(transaction);
    await AsyncStorage.setItem(
      'transaction_history_sci',
      JSON.stringify(history),
    );
  } catch (error) {
    console.error('Error adding transaction:', error);
  }
};

// Function to clear the transaction history
const clearHistory = async () => {
  try {
    await AsyncStorage.removeItem('transaction_history_sci');
  } catch (error) {
    console.error('Error clearing transaction history:', error);
  }
};

const SciCoin = ({route, navigation}) => {
  const {tokenName} = route.params || {tokenName: 'SciCoin'};
  const [transactionInProgress, setTransactionInProgress] = useState(false);
  const {ethBalance} = useBalance(); // Use ethBalance for SciCoin
  const [transactionHistory, setTransactionHistory] = useState([]);
  const [loadingHistory, setLoadingHistory] = useState(true);
  const [isHistoryVisible, setIsHistoryVisible] = useState(false); // New state for toggling history visibility
  const [selectedTransaction, setSelectedTransaction] = useState(null); // State for selected transaction
  const [modalVisible, setModalVisible] = useState(false); // State for modal visibility

  // Animated value for sliding the history section
  const slideAnim = useRef(new Animated.Value(1000)).current; // Initial position off-screen

  const screenWidth = Dimensions.get('window').width;

  // Load transaction history on component mount
  useEffect(() => {
    const loadHistory = async () => {
      const history = await loadTransactionHistory();
      setTransactionHistory(history);
      setLoadingHistory(false);
    };
    loadHistory();
  }, []);

  // Handle transaction completion
  const handleTransactionCompletion = async transaction => {
    setTransactionInProgress(false);
    await addTransaction(transaction);
    const updatedHistory = await loadTransactionHistory();
    setTransactionHistory(updatedHistory);
  };

  const handleTransaction = () => {
    navigation.navigate('QrSendSciCoin');
  };

  const handleReceive = () => {
    navigation.navigate('QrReceiveSciCoin');
  };

  // Handle clearing the transaction history with confirmation
  const handleClearHistory = () => {
    Alert.alert(
      'Clear History',
      'Are you sure you want to clear the transaction history?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Yes',
          onPress: async () => {
            await clearHistory();
            setTransactionHistory([]);
          },
        },
      ],
    );
  };

  // Function to toggle the history visibility with animation
  const toggleHistory = () => {
    setIsHistoryVisible(!isHistoryVisible);

    Animated.timing(slideAnim, {
      toValue: isHistoryVisible ? 1000 : 0, // Slide up or down based on visibility
      duration: 500,
      useNativeDriver: true,
    }).start();
  };

  const renderTransactionItem = ({item}) => (
    <TouchableOpacity
      style={styles.transactionItem}
      onPress={() => handleItemPress(item)} // Handle press action
    >
      <Text style={styles.transactionText}>
        {item.date} - {item.amount} SCI - {item.type}
        {<Icon size={24} name="receipt"></Icon>}
      </Text>
    </TouchableOpacity>
  );

  const handleItemPress = item => {
    setSelectedTransaction(item); // Set the selected transaction
    setModalVisible(true); // Show the modal
  };

  const closeModal = () => {
    setModalVisible(false); // Hide the modal
  };

  return (
    <View style={styles.container}>
      <Header
        title={'SciCoin'}
        icon={require('../images/back.png')}
        onPress={() => navigation.goBack()}
      />
      <View style={styles.section}>
        <Text style={styles.header}>{tokenName} Balance</Text>
        <Text style={styles.balanceText}>{ethBalance} SCI</Text>

        {/* Row for Send and Receive buttons */}
        <View style={styles.buttonRow}>
          <TouchableOpacity
            style={[
              styles.transactionButton,
              transactionInProgress ? styles.disabledButton : null,
            ]}
            onPress={handleTransaction}
            disabled={transactionInProgress}>
            <Text style={styles.transactionButtonText}>
              {transactionInProgress ? 'Processing...' : 'Send Token'}
            </Text>
            <Icon
              style={styles.ionicon}
              name="send-sharp"
              size={30}
              color="white"
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.transactionButton,
              transactionInProgress ? styles.disabledButton : null,
            ]}
            onPress={handleReceive}
            disabled={transactionInProgress}>
            <Text style={styles.transactionButtonText}>
              {transactionInProgress ? 'Processing...' : 'Receive Token'}
            </Text>
            <Icon
              style={styles.ionicon}
              name="swap-horizontal-sharp"
              size={30}
              color="white"
            />
          </TouchableOpacity>
        </View>

        {/* Row for Clear and Show/Hide History buttons */}
        <View style={styles.buttonRow}>
          <TouchableOpacity
            style={styles.clearHistoryButton}
            onPress={handleClearHistory}>
            <Text style={styles.clearHistoryButtonText}>Clear History</Text>
            <Icon style={styles.ionicon} name="trash" size={30} color="white" />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.toggleHistoryButton}
            onPress={toggleHistory}>
            <Text style={styles.toggleHistoryButtonText}>
              {isHistoryVisible ? 'Hide History' : 'Show History'}
            </Text>
            <Icon
              style={styles.ionicon}
              name={
                isHistoryVisible ? 'chevron-down-outline' : 'chevron-up-outline'
              }
              size={30}
              color="black"
            />
          </TouchableOpacity>
        </View>
      </View>

      {/* Conditionally render transaction history with sliding animation */}
      <Animated.View
        style={[
          styles.historySection,
          {transform: [{translateY: slideAnim}]}, // Apply the animated value to translateY
        ]}>
        {isHistoryVisible && (
          <>
            <Text style={styles.historyHeader}>Transaction History</Text>
            {loadingHistory ? (
              <ActivityIndicator size="large" color="#0000ff" />
            ) : transactionHistory.length === 0 ? (
              <Text style={styles.noTransactions}>No transactions found.</Text>
            ) : (
              <FlatList
                data={transactionHistory}
                keyExtractor={(item, index) => index.toString()}
                renderItem={renderTransactionItem}
                showsVerticalScrollIndicator={false}
              />
            )}
          </>
        )}
      </Animated.View>

      {/* Modal for displaying transaction hash */}
      <Modal
        transparent={true}
        visible={modalVisible}
        animationType="slide"
        onRequestClose={closeModal}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Transaction Details</Text>
            <Text style={styles.modalText}>
              Hash: {selectedTransaction?.transactionHash || 'N/A'}
            </Text>
            <TouchableOpacity style={styles.modalButton} onPress={closeModal}>
              <Text style={styles.modalButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#90EE90', // Updated to match light theme
  },
  section: {
    padding: 20,
    marginTop: 0,
    alignItems: 'center',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#2f2f2f',
  },
  balanceText: {
    fontSize: 40,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#2f2f2f',
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '85%',
    marginVertical: 10,
  },
  transactionButton: {
    backgroundColor: 'green',
    padding: 15,
    borderRadius: 10,
    width: '45%',
    alignItems: 'center',
  },
  transactionButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  clearHistoryButton: {
    backgroundColor: '#FF6347', // Softer red
    padding: 15,
    borderRadius: 10,
    width: '45%',
    alignItems: 'center',
  },
  clearHistoryButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  toggleHistoryButton: {
    backgroundColor: '#EEEEAA',
    padding: 15,
    borderRadius: 10,
    width: '45%',
    alignItems: 'center',
  },
  toggleHistoryButtonText: {
    color: '#654321',
    fontSize: 16,
    fontWeight: 'bold',
  },
  disabledButton: {
    opacity: 0.5,
  },
  historySection: {
    position: 'absolute',
    bottom: 0, // Position it at the bottom of the screen
    width: '90%',
    backgroundColor: 'green', // Darker green for contrast
    padding: 20,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    height: '40%',
    marginLeft: 20,
  },
  historyHeader: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
    color: 'white',
    textAlign: 'center',
  },
  noTransactions: {
    color: 'white',
    textAlign: 'center',
    marginTop: 20,
  },
  transactionItem: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  transactionText: {
    fontSize: 16,
    color: 'white',
  },
  ionicon: {
    marginTop: 10,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Dark overlay
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    width: '80%',
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  modalText: {
    fontSize: 16,
    marginBottom: 20,
  },
  modalButton: {
    backgroundColor: 'green',
    padding: 10,
    borderRadius: 5,
  },
  modalButtonText: {
    color: 'white',
    fontSize: 16,
  },
});

export default SciCoin;
