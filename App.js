import {View, Text} from 'react-native';
import React from 'react';
import AppNavigator from './src/AppNavigator';
import {BalanceProvider} from './src/BalanceContext';

const App = () => {
  return (
    <BalanceProvider>
      <AppNavigator />
    </BalanceProvider>
  );
};

export default App;
