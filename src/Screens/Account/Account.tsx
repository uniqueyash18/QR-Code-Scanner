import {View, Text, ScrollView, Alert} from 'react-native';
import React, {FC} from 'react';
import WrapperContainer from '../../Components/WrapperContainer';
import Header from '../../Components/Header';
import {t} from 'i18next';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import navigationStrings from '../../constants/navigationStrings';
import {StackNavigationProp} from '@react-navigation/stack';
import AccountListComp from '../../Components/AccountListComp';
import imagePath from '../../constants/imagePath';
import {onLogOut} from '../../redux/actions/auth';
import {moderateScale, moderateVerticalScale} from 'react-native-size-matters';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import colors from '../../styles/colors';
interface Proptypes {
  data?: object;
}
const Account: FC<Proptypes> = ({data}: Proptypes) => {
  const navigation = useNavigation<StackNavigationProp<any>>();
  const userData =useSelector((state : RootState)=>state?.auth?.userData)
  const listItems = [
    {
      id: 1,
      title: 'Profile',
      onPress: () => navigation.navigate(navigationStrings.Profile),
      leftIcon: imagePath.profileicon,
      topTitle:'Account'
    },
    {
      id: 3,
      title: 'Contact us',
      onPress: () => navigation.navigate(navigationStrings.ContactUs),
      leftIcon: imagePath.contactUs,
      topTitle:'General'
    },
    {
      id: 4,
      title: 'About',
      onPress: () => navigation.navigate(navigationStrings.About),
      leftIcon: imagePath.about,
    },
    {
      id: 9,
      title: 'Terms & Conditions',
      onPress: () => navigation.navigate(navigationStrings.TermCondition),
      leftIcon: imagePath.about,
    },
    {
      id: 5,
      title: 'Logout',
      onPress: () => Alert.alert('','Are you sure you want to log out?',[
        {
          text: t('CANCEL'),
          onPress: () => console.log('Cancel Pressed'),
        },
        {
          text: t('CONFIRM'),
          onPress: () => onLogOut() ,
        },
      ]
      ),
      leftIcon: imagePath.logout,
    },
  ]
  return (
    <WrapperContainer>
      <Header cetnerTitle={t('ACCOUNT')} isLeft={false} />
      <ScrollView showsVerticalScrollIndicator={false}>
        {listItems.map(item => {
          return (
            <AccountListComp
               title={item?.topTitle}
              leftIcon={item?.leftIcon}
              centerTitle={item?.title}
              onPressItem={item?.onPress}
            />
          );
        })}
         <View style={{height: moderateScale(100)}} />
      </ScrollView>
    </WrapperContainer>
  );
};

export default Account;
