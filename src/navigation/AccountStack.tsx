import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import AboutUs from '../Screens/CMSPages/AboutUs';
import TermsCondition from '../Screens/CMSPages/TermsCondition';
import ContactUs from '../Screens/ContactUs/ContactUs';
import navigationStrings from '../constants/navigationStrings';
import Profile from '../Screens/Profie/Profile';
import Account from '../Screens/Account/Account';
import Webview from '../Screens/Webview/Webview';
const Stack = createNativeStackNavigator();
const AccountStack = () => {
  return (
    <Stack.Navigator initialRouteName={navigationStrings.Account} screenOptions={{headerShown: false}}>
      <Stack.Screen component={Account} name={navigationStrings.Account} />
      <Stack.Screen component={Profile} name={navigationStrings.Profile} />
      <Stack.Screen name={navigationStrings.Weblink} component={Webview} />
      <Stack.Screen name={navigationStrings.ContactUs} component={ContactUs} />
      <Stack.Screen name={navigationStrings.About} component={AboutUs} />
      <Stack.Screen name={navigationStrings.TermCondition} component={TermsCondition} />
    </Stack.Navigator>
  );
};

export default AccountStack;
