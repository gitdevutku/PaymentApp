import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Alert,
  ScrollView,
} from 'react-native';
import {useFocusEffect} from '@react-navigation/native';
import Icon from '@react-native-vector-icons/ionicons'; // Use icons for buttons
import Header from '../components/Header';
import {useBalance} from '../BalanceContext';

const Item = ({item, onPress, iconName}) => (
  <View style={styles.item}>
    <TouchableOpacity style={styles.card} onPress={() => onPress(item)}>
      <Icon name={iconName} size={24} color="#654321" style={styles.cardIcon} />
      <Text style={styles.cardText}>{item.id}</Text>
    </TouchableOpacity>
  </View>
);

const Home = ({navigation}) => {
  const {ethBalance, tryBalance, fetchBalance} = useBalance();

  const data = [
    {id: 'Turkish Lira', iconName: 'wallet'},
    {id: 'SCI Coin', iconName: 'logo-bitcoin'},
    {id: 'Buy a Coffee', iconName: 'cafe'},
    {id: 'Settings', iconName: 'settings'},
    {id: 'About App', iconName: 'information-circle'},
  ];

  const getBalanceBackgroundColor = balance => {
    if (balance && parseFloat(balance) < 0.5) {
      return '#FFCCCB'; // Light red color for low balance
    }
    return '#EEEEAA'; // Default background color
  };

  useFocusEffect(
    React.useCallback(() => {
      fetchBalance();
    }, [fetchBalance]),
  );

  const handlePress = item => {
    switch (item.id) {
      case 'Turkish Lira':
        navigation.navigate('TurkishLira');
        break;
      case 'Buy a Coffee':
        navigation.navigate('Coffee');
        break;
      case 'SCI Coin':
        navigation.navigate('SciCoin');
        break;
      case 'Settings':
        navigation.navigate('Settings');
        break;
      case 'About App':
        navigation.navigate('AboutApp');
        break;
      default:
        Alert.alert('Error', 'Unknown item selected');
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Header title={'PayApp'} icon={require('../images/splash.png')} />
      <View style={styles.balanceContainer}>
        <View style={styles.balanceColumn}>
          <TouchableOpacity onPress={() => navigation.navigate('TurkishLira')}>
            <Text
              style={[
                styles.balanceText,
                {backgroundColor: getBalanceBackgroundColor(tryBalance)},
              ]}>
              Turkish Lira: {tryBalance ? `TRYS ${tryBalance}` : 'Loading...'}
            </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.balanceColumn}>
          <TouchableOpacity onPress={() => navigation.navigate('SciCoin')}>
            <Text
              style={[
                styles.balanceText,
                {backgroundColor: getBalanceBackgroundColor(ethBalance)},
              ]}>
              SCI: {ethBalance ? `${ethBalance} SCI` : 'Loading...'}
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Quick Access Buttons */}
      <View style={styles.actionButtonContainer}>
        <TouchableOpacity
          style={styles.actionButton}
          onPress={() => navigation.navigate('QrSendTurkishLira')}>
          <Icon name="send" size={24} color="#FFF" />
          <Text style={styles.actionButtonText}>Send Money</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.actionButton}
          onPress={() => navigation.navigate('QrReceiveTurkishLira')}>
          <Icon name="arrow-down-circle" size={24} color="#FFF" />
          <Text style={styles.actionButtonText}>Receive Money</Text>
        </TouchableOpacity>
      </View>

      {/* Menu List */}
      <FlatList
        data={data}
        renderItem={({item}) => (
          <Item item={item} onPress={handlePress} iconName={item.iconName} />
        )}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContainer}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#90EE90',
  },
  balanceContainer: {
    marginTop: 40,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    marginBottom: 20,
    backgroundColor: '#90EE90',
  },
  balanceColumn: {
    flex: 1,
    elevation: 5,
    marginHorizontal: 5,
  },
  balanceText: {
    fontSize: 18,
    fontWeight: '700',
    borderWidth: 2,
    borderColor: 'white',
    padding: 15,
    borderRadius: 10,
    textAlign: 'center',
    backgroundColor: '#EEEEAA',
    color: '#654321',
  },
  actionButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginVertical: 20,
  },
  actionButton: {
    backgroundColor: 'green',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  actionButtonText: {
    color: '#FFF',
    fontSize: 16,
    marginLeft: 10,
  },
  item: {
    marginVertical: 10,
    width: '90%',
    alignSelf: 'center',
  },
  card: {
    backgroundColor: '#EEEEAA',
    padding: 15,
    borderRadius: 20,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    elevation: 3,
    borderColor: 'white',
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 5,
  },
  cardText: {
    fontSize: 20,
    fontWeight: '700',
    color: '#654321',
    marginLeft: 15,
  },
  cardIcon: {
    marginRight: 15,
  },
  listContainer: {
    marginBottom: 50,
  },
});

export default Home;
