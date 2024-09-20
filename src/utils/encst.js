import EncryptedStorage from 'react-native-encrypted-storage';

const privateKey =
  '0xe1119699c0f01f7e18a6653be970854396692a00b5d188ab2373ec5fc6157696';

// Function to store the private key
const storePrivateKey = async () => {
  try {
    await EncryptedStorage.setItem('private_key', privateKey);
    console.log('Private key stored successfully');
  } catch (error) {
    console.error('Error storing private key:', error);
  }
};

// Call the storePrivateKey function when needed
storePrivateKey();
