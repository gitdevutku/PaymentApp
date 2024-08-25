import React, {useRef, useState} from 'react';
import {Text, View, StyleSheet, Alert} from 'react-native';
import {Camera, useCameraDevices} from 'react-native-vision-camera';
import {useCameraPermissions} from 'react-native-vision-camera';
import {
  BarcodeFormat,
  useBarcodeScanner,
} from 'react-native-vision-camera-barcode-scanner';

const QrReceiveTurkishLira = () => {
  const [hasPermission, setHasPermission] = useState(false);
  const cameraRef = useRef(null);
  const devices = useCameraDevices();
  const device = devices.back;

  const [cameraPermissionStatus, requestCameraPermission] =
    useCameraPermissions();

  React.useEffect(() => {
    (async () => {
      if (cameraPermissionStatus === 'authorized') {
        setHasPermission(true);
      } else {
        const permission = await requestCameraPermission();
        setHasPermission(permission === 'authorized');
      }
    })();
  }, [cameraPermissionStatus, requestCameraPermission]);

  const onBarcodeScanned = ({barcodes}) => {
    barcodes.forEach(barcode => {
      console.log('QR Code Data:', barcode.displayValue);
      Alert.alert('QR Code Data', barcode.displayValue);
    });
  };

  if (device == null || !hasPermission) {
    return (
      <View style={styles.container}>
        <Text>No camera access</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Camera
        ref={cameraRef}
        style={StyleSheet.absoluteFill}
        onBarcodeScanned={onBarcodeScanned}
        isActive={true}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default QrReceiveTurkishLira;
