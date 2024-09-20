import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Switch,
  Alert,
} from 'react-native';
import EncryptedStorage from 'react-native-encrypted-storage';
import Header from '../components/Header';

const SettingsScreen = ({navigation}) => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');

  const toggleSwitch = async () => {
    try {
      setIsDarkMode(previousState => !previousState);
      await EncryptedStorage.setItem('theme', !isDarkMode ? 'dark' : 'light');
    } catch (error) {
      console.error('Failed to save theme preference:', error);
    }
  };

  const handleLogout = async () => {
    try {
      await EncryptedStorage.removeItem('private_key');
      Alert.alert('Logged out', 'Your session has been cleared.');
      navigation.navigate('Login');
    } catch (error) {
      console.error('Failed to log out:', error);
      Alert.alert('Error', 'Failed to log out. Please try again.');
    }
  };

  const handlePasswordChange = async () => {
    if (!currentPassword || !newPassword) {
      Alert.alert('Error', 'Please enter both current and new passwords.');
      return;
    }

    // Here you should ideally check the current password and update with new password
    try {
      // For demonstration, we are just simulating a password change
      await EncryptedStorage.setItem('password', newPassword);
      Alert.alert('Success', 'Password changed successfully.');
      setCurrentPassword('');
      setNewPassword('');
    } catch (error) {
      console.error('Failed to change password:', error);
      Alert.alert('Error', 'Failed to change password. Please try again.');
    }
  };

  return (
    <View style={styles.container}>
      <Header
        onPress={() => navigation.goBack()}
        icon={require('../images/back.png')}
        title={'Settings'}
      />
      <View style={styles.optionContainer}>
        <Text style={styles.header}>Settings</Text>
        <View style={styles.switchContainer}>
          <Text style={styles.optionLabel}>Dark Mode</Text>
          <Switch
            value={isDarkMode}
            onValueChange={toggleSwitch}
            trackColor={{false: '#767577', true: '#81b0ff'}}
            thumbColor={isDarkMode ? '#f5dd4b' : '#f4f3f4'}
          />
        </View>
      </View>

      <View style={styles.passwordContainer}>
        <Text style={styles.label}>Current Password:</Text>
        <TextInput
          value={currentPassword}
          onChangeText={setCurrentPassword}
          placeholder="Enter your current password"
          secureTextEntry
          style={styles.input}
        />

        <Text style={styles.label}>New Password:</Text>
        <TextInput
          value={newPassword}
          onChangeText={setNewPassword}
          placeholder="Enter your new password"
          secureTextEntry
          style={styles.input}
        />

        <TouchableOpacity
          style={styles.chbutton}
          onPress={handlePasswordChange}>
          <Text style={styles.buttonText}>Change Password</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.button} onPress={handleLogout}>
        <Text style={styles.buttonText}>Log Out</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#90EE90',
  },
  optionContainer: {
    padding: 20,
    marginBottom: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#654321',
    borderWidth: 2,
    borderColor: 'white',
    padding: 20,
    borderRadius: 20,
    backgroundColor: '#EEEEAA',
  },
  switchContainer: {
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    backgroundColor: '#EEEEAA',
    borderRadius: 10,
    padding: 10,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  optionLabel: {
    fontSize: 18,
    flex: 1,
    color: '#654321',
  },
  input: {
    width: '80%',
    padding: 10,
    borderWidth: 1,
    borderColor: '#654321',
    borderRadius: 20,
    backgroundColor: '#EEEEAA',
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
    alignItems: 'center',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 5,
    marginLeft: 50,
  },
  chbutton: {
    backgroundColor: '#EEEEAA',
    padding: 15,
    borderRadius: 20,
    width: '75%',
    alignItems: 'center',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 5,
    margin: 10,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#654321',
  },
  passwordContainer: {
    marginLeft: 50,
    padding: 20,
    marginBottom: 20,
  },
  label: {
    fontSize: 18,
    marginBottom: 10,
    color: '#654321',
  },
});

export default SettingsScreen;
