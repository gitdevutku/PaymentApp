import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import EncryptedStorage from 'react-native-encrypted-storage';
import Header from '../components/Header';

const LoginPage = ({navigation}) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const storeCredentials = async (username, password) => {
    try {
      await EncryptedStorage.setItem(
        username,
        JSON.stringify({username, password}),
      );
      Alert.alert(
        'Account Created',
        'Your account has been created successfully',
      );
      navigation.navigate('Home'); // Navigate to the Home screen on success
    } catch (error) {
      console.log('Error storing credentials:', error);
      Alert.alert('Error', 'Failed to store credentials');
    }
  };

  const handleLogin = async () => {
    const correctUsername = 'admin';
    const correctPassword = 'password123';

    // Check if username exists in storage
    const storedCredentials = await EncryptedStorage.getItem(username);

    if (storedCredentials) {
      // If credentials exist, verify the password
      const {password: storedPassword} = JSON.parse(storedCredentials);
      if (storedPassword === password) {
        navigation.navigate('Home');
      } else {
        Alert.alert('Login Failed', 'Incorrect password');
      }
    } else if (username !== correctUsername) {
      // If username does not match the correct one, create a new account
      Alert.alert(
        'Account Not Found',
        'Username does not exist. Would you like to create a new account?',
        [
          {
            text: 'Cancel',
            style: 'cancel',
          },
          {
            text: 'Create Account',
            onPress: () => storeCredentials(username, password),
          },
        ],
      );
    } else {
      Alert.alert('Login Failed', 'Incorrect username or password');
    }
  };
  return (
    <View style={styles.container}>
      <Header
        title={'Login to PayApp'}
        icon={require('../images/splash.png')}
      />
      <View style={styles.section}>
        <Text style={styles.label}>Username:</Text>
        <TextInput
          value={username}
          onChangeText={setUsername}
          placeholder="Enter your username"
          style={styles.input}
        />

        <Text style={styles.label}>Password:</Text>
        <TextInput
          value={password}
          onChangeText={setPassword}
          placeholder="Enter your password"
          secureTextEntry
          style={styles.input}
        />

        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Login / Create Account</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

// Styles to match the Home screen's theme
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#90EE90', // Light green to match the home screen theme
  },
  section: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  label: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#654321', // Brownish color similar to the Home screen
  },
  input: {
    width: '80%',
    padding: 10,
    borderWidth: 1,
    borderColor: '#654321',
    borderRadius: 20,
    backgroundColor: '#EEEEAA', // Light yellow background for inputs
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 3,
  },
  button: {
    backgroundColor: '#EEEEAA',
    padding: 15,
    borderRadius: 20,
    width: '75%',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 5,
  },
  buttonText: {
    fontSize: 20,
    fontWeight: '700',
    color: '#654321',
  },
});

export default LoginPage;
