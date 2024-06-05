import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import React, {FC, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {Image, Modal, Text, View} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {moderateScale, moderateVerticalScale} from 'react-native-size-matters';
import {useDispatch} from 'react-redux';
import {CustomTextInput} from '../../Components/CustomTextInput';
import GradientButton from '../../Components/GradientButton';
import WrapperContainer from '../../Components/WrapperContainer';
import imagePath from '../../constants/imagePath';
import navigationStrings from '../../constants/navigationStrings';
import usePostData from '../../hooks/usePostData';
import {SIGNUP} from '../../services/routes';
import colors from '../../styles/colors';
import fontFamily from '../../styles/fontFamily';
import {textScale, width} from '../../styles/responsiveSize';
import {showError, showSuccess} from '../../utils/helperFunctions';
import {requestUserPermission} from '../../utils/notificationService';
import validate from '../../utils/validation';
import {styles} from './styles';
import BottomModal from '../../Components/BottomModal';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {getItem, setItem} from '../../services/apiService';
import {setUserdata} from '../../redux/reducers/auth';
import {PhoneNumberInput} from '../../Components/PhoneNumberInput';
interface PropTypes {
  data?: any;
}
interface ComponentStates {
  phoneNumber: string;
  email: string;
  name: string;
  password: any;
  confirmPassword: any;
  hidePass: boolean | undefined;
  hideConfirmPass: boolean | undefined;
  countryCode: string;
  countryFlag: string;
}
interface SignUpResponseData {
  data: object;
  message: string;
}

interface SignUpRequestData {}
const Signup: FC<PropTypes> = ({data}: PropTypes) => {
  const {t, i18n} = useTranslation();
  const navigation = useNavigation<StackNavigationProp<any>>();
  const dispatch = useDispatch();
  const [state, setState] = useState<ComponentStates>({
    phoneNumber: '',
    email: '',
    name: '',
    password: '',
    confirmPassword: '',
    hidePass: true,
    hideConfirmPass: true,
    countryCode: '91',
    countryFlag: 'IN',
  });
  const onPressRightConfirmPass = () => {
    updateState({
      hideConfirmPass: !hideConfirmPass,
    });
  };
  const onPressRightPass = () => {
    updateState({
      hidePass: !hidePass,
    });
  };

  const {
    phoneNumber,
    name,
    email,
    password,
    confirmPassword,
    hidePass,
    hideConfirmPass,
    countryCode,
    countryFlag,
  } = state;
  const updateState = (data: Partial<ComponentStates>) =>
    setState(state => ({...state, ...data}));

  const {mutate: onSignUpUser, isPending} = usePostData<
    SignUpResponseData,
    Error,
    SignUpRequestData
  >(SIGNUP, {
    onSuccess: async (data, variable) => {
      showSuccess(data?.data?.message);
      setItem('userData', data?.data?.data);
      dispatch(setUserdata(data?.data?.data));
      // navigation.navigate(navigationStrings.OtpVerify, data?.data?.data);
    },
    onError: async (error, variable) => {
      showError(error);
    },
  });

  const onSignUp = async () => {
    requestUserPermission()
      .then(fcm_token => {
        const validation = validate({
          phonenumber: String(phoneNumber),
          email: email,
          name: name,
          password: password,
          confirmPassword: confirmPassword,
        });
        if (validation == true) {
          onSignUpUser({
            phonenumber: phoneNumber,
            email: email,
            name: name,
            password: password,
            isAdmin: false,
            fcm_token: fcm_token,
          });
        } else {
          showError(validation);
        }
      })
      .catch(err => {
        showError(err);
      });
  };
  return (
    <WrapperContainer isSafeArea={true}>
      <ScrollView
        style={styles.bottomview}
        showsVerticalScrollIndicator={false}>
        <View>
          <Text style={styles.logintxt}>{t('SIGNUP')}</Text>
          <View style={styles.inputarea}>
            <CustomTextInput
              value={name}
              placeholder={t('NAME')}
              containerStyles={{marginBottom: moderateScale(18)}}
              onChangeText={val => {
                updateState({name: val});
              }}
            />
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
              containerStyles={{marginBottom: moderateScale(18)}}
              onChangeText={val => {
                updateState({phoneNumber: val});
              }}
            />
            <CustomTextInput
              value={email}
              keyboardType="email-address"
              placeholder={t('EMAIL')}
              containerStyles={{marginBottom: moderateScale(18)}}
              onChangeText={val => {
                updateState({email: val});
              }}
            />
            <CustomTextInput
              value={password}
              placeholder={t('PASSWORD')}
              containerStyles={{marginBottom: moderateScale(18)}}
              onChangeText={val => {
                updateState({password: val});
              }}
              rightImg={imagePath.hideEye}
              rightImageStyle={{height: moderateVerticalScale(20)}}
              onPressRight={onPressRightPass}
              secureTextEntry={hidePass as undefined}
            />
            <CustomTextInput
              value={confirmPassword}
              placeholder={t('CONFIRM_PASSWORD')}
              containerStyles={{marginBottom: moderateScale(18)}}
              onChangeText={val => {
                updateState({confirmPassword: val});
              }}
              rightImg={imagePath.hideEye}
              rightImageStyle={{height: moderateVerticalScale(20)}}
              onPressRight={onPressRightConfirmPass}
              secureTextEntry={hideConfirmPass as undefined}
            />
          </View>
        </View>
      </ScrollView>
      <GradientButton
        onPress={onSignUp}
        indicator={isPending}
        btnText={t('SIGNUP')}
        containerStyle={{marginTop: moderateVerticalScale(10)}}
      />
      <View style={styles.dontHaveAcc}>
        <Text style={{fontSize: textScale(14), color: colors.blackB}}>
          {t('ALREADY_HAVE_ACC')}
          <Text
            onPress={() => {
              navigation.navigate(navigationStrings.Login);
            }}
            style={{color: colors.themeColor}}>
            {' '}
            {t('LOGIN')}
          </Text>
        </Text>
      </View>
    </WrapperContainer>
  );
};

export default Signup;
