import React from 'react';
import Login from '../Screens/Login/Login';
import Signup from '../Screens/Signup/Signup';
import navigationStrings from '../constants/navigationStrings';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import OtpVerify from '../Screens/OtpVerification/OtpVerify';
import Onboarding from '../Screens/Onboarding/Onboarding';
const AuthStack = () => {
  const Stack = createNativeStackNavigator();
  return (
    <>
      {/* <Stack.Screen component={Onboarding} name={navigationStrings.Onboarding} /> */}
      <Stack.Screen component={Signup} name={navigationStrings.Signup} />
      <Stack.Screen component={Login} name={navigationStrings.Login} />
      <Stack.Screen component={OtpVerify} name={navigationStrings.OtpVerify} />
    </>
  );
};

export default AuthStack;
