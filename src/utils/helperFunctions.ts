import i18next from 'i18next';
import {Alert, AlertButton, Linking, PermissionsAndroid, Platform} from 'react-native';
import {showMessage} from 'react-native-flash-message';
import {MMKV} from 'react-native-mmkv';
import {moderateVerticalScale} from 'react-native-size-matters';
import RNFS from 'react-native-fs';
import XLSX from 'xlsx';
import RNFetchBlob from 'rn-fetch-blob';
import axios from 'axios';
const storage = new MMKV();


export const changeLang = (lng: any) => {
  i18next.changeLanguage(lng);
};

export const setStorage = (key: string, value: any) => {
  storage.set(key, value);
};
export const getStorage = (key: string) => {
  storage.getString(key);
};

export const showError = (message: any) => {
  console.log(message, 'THIS IS MESSAGE');
  showMessage({
    type: 'danger',
    icon: 'danger',
    floating: true,
    animated: true,
    message,
    style: {marginTop: moderateVerticalScale(16)},
  });
  // Toast.show(message);
};

export const showSuccess = (message: any) => {
  showMessage({
    type: 'success',
    icon: 'success',
    floating: true,
    animated: true,
    style: {marginTop: moderateVerticalScale(16)},
    message,
  });

  // Toast.show(message);
};
export const showInfo = (message: any) => {
  showMessage({
    type: 'info',
    icon: 'info',
    message,
  });
  // Toast.show(message);
};

export const makePhoneCall = (phoneNumber: string) => {
  const url = `tel:${phoneNumber}`;
  if (Platform.OS === 'android') {
    phoneNumber = `tel:${phoneNumber}`;
  } else {
    phoneNumber = `telprompt:${phoneNumber}`;
  }

  Linking.openURL(phoneNumber);
};

// Function to send an email
export const sendEmail = (email: string) => {
  Linking.openURL(`mailto:${email}`);
};

// Function to send a text message
export const sendTextMessage = (phoneNumber: string) => {
  phoneNumber = `sms:${phoneNumber}`;
  Linking.openURL(phoneNumber);
};

// Function to send a WhatsApp message
export const sendWhatsAppMessage = (phoneNumber: string, message: string) => {
  const url = `https://wa.me/91${phoneNumber}?text=${message})`;
  Linking.openURL(url);
};

export const parseXLSXFile = async (filePath: string) => {
  try {
    // Read the file
    const content = await RNFS.readFile(filePath, 'ascii');

    // Parse workbook
    const workbook = XLSX.read(content, {type: 'binary'});

    // Assume the first sheet is the one we want to parse
    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];

    // Convert worksheet to JSON
    const data = XLSX.utils.sheet_to_json(worksheet);

    return data;
  } catch (error) {
    console.error('Error parsing XLSX file:', error);
    throw error;
  }
};

export const showCodeAlert = (value: string, onDismissed: () => void): void => {
  const buttons: AlertButton[] = [
    {
      text: 'Close',
      style: 'cancel',
      onPress: onDismissed,
    },
  ]
  if (value.startsWith('http')) {
    buttons.push({
      text: 'Open URL',
      onPress: () => {
        Linking.openURL(value)
        onDismissed()
      },
    })
  }
  Alert.alert('Scanned Code', value, buttons)
}
