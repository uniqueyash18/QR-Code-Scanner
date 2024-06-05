/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */
import React, { useEffect } from 'react';
import { View } from 'react-native';

import Geolocation from '@react-native-community/geolocation';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import FlashMessage from 'react-native-flash-message';
import SplashScreen from 'react-native-splash-screen';
import { useDispatch } from 'react-redux';
import Routes from './src/navigation/Routes';
import { setLocation, setUserdata } from './src/redux/reducers/auth';
import { getItem } from './src/services/apiService';
import ForegroundHandler from './src/utils/ForegroundHandler';
import { getLocationName } from './src/utils/locationApi';
import { notificationListener } from './src/utils/notificationService';
import { chekLocationPermission } from './src/utils/permisions';

function App(): React.JSX.Element {
  const dispatch = useDispatch();
  const queryClient = new QueryClient();
  useEffect(() => {
    setTimeout(() => {
      SplashScreen.hide();
    }, 1000);
  }, []);
  useEffect(()=>{
(async()=>{
  await getCurrentLocation();
})()
  },[])

  const getCurrentLocation = async () => {
    const hasPermission = await chekLocationPermission();
    if (hasPermission) {
      try {
        Geolocation.getCurrentPosition(
          location => {
            getLocationName(
              location.coords.latitude,
              location?.coords?.longitude,
            ).then(res => {
              dispatch(setLocation(res));
              console.log(res, 'locationlocation');
            });
          },
          error => {
            console.error('Error getting location:', error.message);
          },
          {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000},
        );
      } catch (error) {
        console.error('Error getting location:', error);
      }
    } else {
      console.log('Location permission not granted');
    }
  };
  useEffect(() => {
    (async () => {
      const userData = getItem('userData');
      if (!!userData) {
        dispatch(setUserdata(userData));
      }

      notificationListener();
    })();
  }, []);

  return (
    <View style={{flex: 1}}>
      <QueryClientProvider client={queryClient}>
        {/* <ForegroundHandler /> */}
        <Routes />
      </QueryClientProvider>
      <FlashMessage position="top" />
    </View>
  );
}

export default App;
