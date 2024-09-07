import React, {useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Alert,
} from 'react-native';
import {useFocusEffect} from '@react-navigation/native'; // Import useFocusEffect
import Header from '../components/Header';
import {useBalance} from '../BalanceContext'; // Import the custom hook

const Item = ({item, onPress}) => (
  <View style={styles.item}>
    <TouchableOpacity style={styles.card} onPress={() => onPress(item)}>
      <Text style={styles.cardText}>{item.id}</Text>
    </TouchableOpacity>
  </View>
);

const Home = ({navigation}) => {
  const {ethBalance, tryBalance, fetchBalance} = useBalance(); // ethBalance is SCI

  const data = [
    {id: 'Turkish Lira'},
    {id: 'Buy a Coffee'},
    {id: 'SCI Coin'},
    {id: 'Settings'},
    {id: 'About App'},
  ];
  const getBalanceBackgroundColor = balance => {
    if (balance && parseFloat(balance) < 0.5) {
      return '#FFCCCB'; // Light red color for balance below 0.5
    }
    return '#EEEEAA'; // Default background color
  };

  // Fetch balance when screen is focused
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
    <View style={styles.container}>
      <Header title={'PayApp'} icon={require('../images/splash.png')} />
      <View style={styles.balanceContainer}>
        <View style={styles.balanceColumn}>
          <Text
            style={[
              styles.balanceText,
              {backgroundColor: getBalanceBackgroundColor(tryBalance)},
            ]}>
            Turkish Lira: {tryBalance ? `TRYS ${tryBalance}` : 'Loading...'}
          </Text>
        </View>
        <View style={styles.balanceColumn}>
          <Text
            style={[
              styles.balanceText,
              {backgroundColor: getBalanceBackgroundColor(ethBalance)},
            ]}>
            SCI: {ethBalance ? `${ethBalance} SCI` : 'Loading...'}
          </Text>
        </View>
      </View>
      <FlatList
        data={data}
        renderItem={({item}) => <Item item={item} onPress={handlePress} />}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#90EE90',
  },
  balanceContainer: {
    marginTop: 100,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    marginBottom: 0,
    backgroundColor: '#90EE90',
  },
  balanceColumn: {
    flex: 1,
    elevation: 5,
    marginHorizontal: 5,
  },
  balanceText: {
    fontSize: 20,
    fontWeight: '700',
    borderWidth: 2,
    borderColor: 'white',
    padding: 15,
    borderRadius: 10,
    textAlign: 'center',
    backgroundColor: '#EEEEAA',
    color: '#654321',
  },
  item: {
    margin: 10,
    width: '90%',
  },
  card: {
    backgroundColor: '#EEEEAA',
    marginLeft: 20,
    padding: 10,
    borderRadius: 20,
    width: '75%',
    justifyContent: 'center',
    alignSelf: 'center',
    elevation: 3,
    borderColor: 'white',
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 5,
  },
  cardText: {
    alignSelf: 'center',
    fontSize: 24,
    fontWeight: '700',
    color: '#654321',
  },
  listContainer: {
    marginTop: 100,
    flexGrow: 1,
  },
});

export default Home;
