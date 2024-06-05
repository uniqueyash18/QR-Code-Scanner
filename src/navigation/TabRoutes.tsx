import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import React from 'react';
import FastImage from 'react-native-fast-image';
import {moderateScale, moderateVerticalScale} from 'react-native-size-matters';
import imagePath from '../constants/imagePath';
import navigationStrings from '../constants/navigationStrings';
import colors from '../styles/colors';
import fontFamily from '../styles/fontFamily';
import {textScale} from '../styles/responsiveSize';
import AccountStack from './AccountStack';
import MainStack from './MainStack';

const TabRoutes = () => {
  const Tab = createBottomTabNavigator();
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          position: 'absolute',
          borderTopRightRadius: moderateScale(24),
          borderTopLeftRadius: moderateScale(24),
          padding: moderateScale(6),
          backgroundColor: colors.themeColor2,
          height: moderateVerticalScale(55),
        },
      }}>
      <Tab.Screen
        options={{
          tabBarLabel: 'Home',
          tabBarLabelStyle: {
            fontFamily: fontFamily.ProximaNovaBold,
            fontSize: textScale(12),
            color: colors.black,
          },
          tabBarIcon: ({focused}) => {
            return (
              <FastImage
                style={{width: 25, height: 25}}
                resizeMode="contain"
                tintColor={
                  focused ? colors.orangeooryks : colors.blackOpacity70
                }
                source={imagePath.ic_home}
              />
            );
          },
        }}
        component={MainStack}
        name={navigationStrings.HomeStack}
      />
  
      <Tab.Screen
        options={{
          tabBarLabel: 'Account',
          tabBarLabelStyle: {
            fontFamily: fontFamily.ProximaNovaBold,
            fontSize: textScale(12),
            color: colors.black,
          },
          tabBarIcon: ({focused}) => {
            return (
              <FastImage
                style={{width: 25, height: 25}}
                resizeMode="contain"
                tintColor={
                  focused ? colors.orangeooryks : colors.blackOpacity43
                }
                source={imagePath.ic_account}
              />
            );
          },
        }}
        component={AccountStack}
        name={navigationStrings.AccountStack}
      />
    </Tab.Navigator>
  );
};

export default TabRoutes;
