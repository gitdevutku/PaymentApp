import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ActivityIndicator,
} from 'react-native';
import Ionicons from '@react-native-vector-icons/ionicons';
import EncryptedStorage from 'react-native-encrypted-storage';
import Header from '../components/Header';

const LoginPage = ({navigation}) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false); // Loading state

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
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogin = async () => {
    if (!username || !password) {
      Alert.alert('Input Error', 'Please enter both username and password.');
      return;
    }

    setIsLoading(true); // Start loading

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

    setIsLoading(false); // Stop loading after processing
  };

  return (
    <View style={styles.container}>
      <Header
        title={'Login to PayApp'}
        icon={require('../images/splash.png')}
      />
      <View style={styles.section}>
        <Text style={styles.label}>Username:</Text>
        <View style={styles.inputWrapper}>
          <Ionicons name="person-outline" size={24} color="#654321" />
          <TextInput
            value={username}
            onChangeText={setUsername}
            placeholder="Enter your username"
            style={styles.input}
            placeholderTextColor="#777"
          />
        </View>

        <Text style={styles.label}>Password:</Text>
        <View style={styles.inputWrapper}>
          <Ionicons name="lock-closed-outline" size={24} color="#654321" />
          <TextInput
            value={password}
            onChangeText={setPassword}
            placeholder="Enter your password"
            secureTextEntry
            style={styles.input}
            placeholderTextColor="#777"
          />
        </View>

        <TouchableOpacity
          style={[styles.button, isLoading && styles.disabledButton]}
          onPress={handleLogin}
          disabled={isLoading}>
          {isLoading ? (
            <ActivityIndicator size="small" color="#654321" />
          ) : (
            <Text style={styles.buttonText}>Login / Create Account</Text>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
};

// Updated styles for better UX
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
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#EEEEAA', // Light yellow background for inputs
    width: '80%',
    borderWidth: 1,
    borderColor: '#654321',
    borderRadius: 20,
    marginBottom: 20,
    paddingHorizontal: 10,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 3,
  },
  input: {
    flex: 1,
    height: 50,
    fontSize: 16,
    color: '#654321',
  },
  icon: {
    width: 24,
    height: 24,
    marginRight: 10,
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
  disabledButton: {
    backgroundColor: '#CCCCCC', // Grayish color for disabled button
  },
  buttonText: {
    fontSize: 20,
    fontWeight: '700',
    color: '#654321',
  },
});

export default LoginPage;
