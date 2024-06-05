import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import Webview from '../Screens/Webview/Webview';
import navigationStrings from '../constants/navigationStrings';
import Home from '../Screens/Home/Home';

const MainStack = () => {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name={navigationStrings.Homescreen} component={Home} />
      <Stack.Screen name={navigationStrings.Weblink} component={Webview} />
    </Stack.Navigator>
  );
};

export default MainStack;
