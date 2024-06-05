import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import React, {FC, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {Image, ScrollView, Text, TouchableOpacity, View} from 'react-native';
import {moderateScale, moderateVerticalScale} from 'react-native-size-matters';
import {useDispatch} from 'react-redux';
import {CustomTextInput} from '../../Components/CustomTextInput';
import GradientButton from '../../Components/GradientButton';
import WrapperContainer from '../../Components/WrapperContainer';
import imagePath from '../../constants/imagePath';
import navigationStrings from '../../constants/navigationStrings';
import usePostData from '../../hooks/usePostData';
import {setUserdata} from '../../redux/reducers/auth';
import {setItem} from '../../services/apiService';
import {LOGIN} from '../../services/routes';
import colors from '../../styles/colors';
import {textScale, width} from '../../styles/responsiveSize';
import {
  showError,
  showSuccess,
} from '../../utils/helperFunctions';
import validate from '../../utils/validation';
import {styles} from './styles';
import {PhoneNumberInput} from '../../Components/PhoneNumberInput';
interface ComponentState {
  phoneNumber: Number;
  passWord: any;
  hidePass: boolean;
  countryCode: string;
  countryFlag: string;
}
interface PropTypes {
  data?: any;
}
interface LoginResponseData {
  data: object;
  message: string;
}
interface LoginRequestData {}
type LoginScreenNavigationProp = StackNavigationProp<any>;
const Login: FC<PropTypes> = ({data}: PropTypes) => {
  const navigation = useNavigation<LoginScreenNavigationProp>();
  const dispatch = useDispatch();
  const {t} = useTranslation();
  const [state, setState] = useState<ComponentState>({
    phoneNumber: 0,
    passWord: '',
    hidePass: true,
    countryCode: '91',
    countryFlag: 'IN',
  });

  const {phoneNumber, passWord, hidePass, countryCode, countryFlag} = state;
  const updateState = (data: any) => setState(state => ({...state, ...data}));
  const onPressRight = () => [
    updateState({
      hidePass: !hidePass,
    }),
  ];
  const {mutate: onLoginUser, isPending} = usePostData<
    LoginResponseData,
    Error,
    LoginRequestData
  >(LOGIN, {
    onSuccess: async (data, variable) => {
      setItem('userData', data?.data?.data);
      dispatch(setUserdata(data?.data?.data));
      showSuccess(data?.data?.message);
    },
    onError: async (error, variable) => {
      showError(error);
    },
  });

  const onPressLogin = async () => {
    const res = validate({
      phoneNumber: String(phoneNumber),
      password: passWord,
    });
    if (res == true) {
      onLoginUser({phonenumber: phoneNumber, password: passWord});
    } else {
      showError(res);
    }
  };

  return (
    <WrapperContainer>
      <ScrollView style={styles.bottomview}>
        <View style={{...styles.bottomview, marginTop: 0}}>
          <Text style={styles.logintxt}>{t('Log_In')}</Text>
          <View style={styles.inputarea}>
            <PhoneNumberInput
              setCountryCode={txt => {
                updateState({countryCode: txt});
              }}
              setCountryFlag={txt => {
                updateState({countryFlag: txt});
              }}
              countryCode={countryCode}
              countryFlag={countryFlag}
              value={phoneNumber}
              keyboardType="numeric"
              placeholder={t('Phone_number')}
              onChangeText={val => {
                updateState({phoneNumber: val});
              }}
              containerStyles={{marginBottom: moderateVerticalScale(12)}}
              maxLength={10}
            />
            <CustomTextInput
              value={passWord}
              keyboardType="default"
              placeholder={t('Password')}
              onChangeText={val => {
                updateState({passWord: val});
              }}
              containerStyles={{marginTop: moderateVerticalScale(12)}}
              rightImg={imagePath.hideEye}
              rightImageStyle={{height: moderateVerticalScale(20)}}
              onPressRight={onPressRight}
              secureTextEntry={hidePass}
            />
            <TouchableOpacity>
              <Text style={styles.forgot}>{t('Forgot_Passsword')}</Text>
            </TouchableOpacity>
          </View>
          <GradientButton
            onPress={onPressLogin}
            indicator={isPending}
            btnText={t('LOGIN')}
          />
        </View>
        <View style={styles.orLoginView}>
          <View style={styles.horizontalLine} />
          <Text
            style={{
              marginHorizontal: moderateScale(12),
              color: colors.textGreyB,
            }}>
            {' '}
            {t('Or_Login_with')}
          </Text>
          <View style={styles.horizontalLine} />
        </View>
        <View style={styles.dontHaveAcc}>
          <Text style={{fontSize: textScale(14), color: colors.black}}>
            {t('DONT_HAVE_ACCOUNT')}
            <Text
              onPress={() => {
                navigation.navigate(navigationStrings.Signup as never);
              }}
              style={{color: colors.themeColor}}>
              {' '}
              {t('SIGNUP')}
            </Text>
          </Text>
        </View>
      </ScrollView>
    </WrapperContainer>
  );
};

export default Login;
