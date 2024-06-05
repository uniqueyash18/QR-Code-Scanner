import messaging, { FirebaseMessagingTypes } from '@react-native-firebase/messaging';
import {PermissionsAndroid, Platform} from 'react-native';
import { getItem, setItem } from '../services/apiService';

export async function requestUserPermission(callback: (error: boolean) => void = () => {}): Promise<void> {
    try {
      if (Platform.OS === 'ios') {
        await messaging().registerDeviceForRemoteMessages();
      }
      if (Platform.Version >= "33") {
        const permission = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
          {
            title: 'Notification Permission',
            message: 'Allow this app to post notifications?',
            buttonNeutral: 'Ask Me Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
          },
        );
  
        if (permission !== null && permission === PermissionsAndroid.RESULTS.GRANTED) {
          return await getFcmToken();

        }
      } else {
        const authStatus = await messaging().requestPermission();
        const enabled =
          authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
          authStatus === messaging.AuthorizationStatus.PROVISIONAL;
  
        if (enabled) {
          return await getFcmToken();
        }
      }
    } catch (error) {
      console.error(error);
      callback(true);
    }
  }

const getFcmToken = async () => {
  const fcm_token = await getItem('fcm_token')
  if(!!fcm_token){
    console.log(fcm_token,'old fcm_token')
    return fcm_token
  }else{
    const newFcmToken = await messaging().getToken();
     setItem('fcm_token',newFcmToken)
     console.log(newFcmToken,'new fcm_token')
    return fcm_token
  }
};

export const notificationListener = async (): Promise<void> => {
    // Background
    messaging().onNotificationOpenedApp((remoteMessage: FirebaseMessagingTypes.RemoteMessage) => {
    });
  
    // Kill or inactive
    const initialNotification = await messaging().getInitialNotification();
  
  };
  