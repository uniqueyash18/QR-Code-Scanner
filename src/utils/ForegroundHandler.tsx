import notifee, {
  AndroidColor,
  AndroidImportance,
  AndroidStyle,
  EventType
} from '@notifee/react-native';
import messaging, { FirebaseMessagingTypes } from '@react-native-firebase/messaging';
import React, { useEffect } from 'react';
import { Platform } from 'react-native';

const ForegroundHandler: React.FC = () => {
  useEffect(() => {
    const unsubscribe = notifee.onForegroundEvent(({ type, detail }:any) => {
      switch (type) {
        case EventType.DISMISSED:
          console.log('User dismissed notification', detail.notification);
          break;
        case EventType.PRESS:
          console.log('User pressed notification', detail);
          break;
      }
    });
    return unsubscribe;
  }, []);

  useEffect(() => {
    const unsubscribe = messaging().onMessage(
      async (remoteMessage: FirebaseMessagingTypes.RemoteMessage) => {
        console.log('remote message foreground', remoteMessage);

        const { data, messageId, notification }:any = remoteMessage;

        const channelId =   await notifee.createChannel({
          id: notification?.android?.channelId || 'default',
          name: 'Default Channel',
          vibration: true,
          lightColor: AndroidColor.YELLOW,
          sound: notification?.android?.sound || 'customnotii',
          importance: AndroidImportance.HIGH,
  
        });

        let displayNotificationData = {};

        if (
          !!data?.fcm_options?.image ||
          !!notification?.android?.imageUrl
        ) {
          if (Platform.OS === 'ios') {
            displayNotificationData = {
              title: data?.title || notification?.title || '',
              body: data?.body || notification?.body || '',
              ios: {
                attachments: [
                  {
                    // Remote image
                    url: data?.fcm_options?.image,
                  },
                ],
              },
              data: { ...data },
            };
          } else {
            displayNotificationData = {
              title: data?.title || notification?.title || '',
              body: data?.body || notification?.body || '',
              android: {
                sound:
                  notification?.android?.sound || 'default',
                channelId,
                pressAction: {
                  id: 'default',
                },
                importance: AndroidImportance.HIGH,
                style: {
                  type: AndroidStyle.BIGPICTURE,
                  picture: notification?.android?.imageUrl,
                },
              },
              ios: {
                sound: 'default',
              },
              data: { ...data },
            };
          }
        } else {
          displayNotificationData = {
            title: data?.title || notification?.title || '',
            body: data?.body || notification?.body || '',
            android: {
              sound: notification?.android?.sound || 'default',
              channelId,
              pressAction: {
                id: 'default',
              },
              importance: AndroidImportance.HIGH,
            },
            ios: {
              sound: 'notification.wav',
            },
            data: { ...data },
          };
        }
        await notifee.displayNotification(displayNotificationData);
      }
    );
    return unsubscribe;
  }, []);

  return null;
};

export default ForegroundHandler;
