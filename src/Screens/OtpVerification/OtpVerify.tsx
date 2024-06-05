import { useNavigation } from '@react-navigation/native';
import React, { FC, useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import OTPTextView from 'react-native-otp-textinput';
import { moderateScale, moderateVerticalScale } from 'react-native-size-matters';
import GradientButton from '../../Components/GradientButton';
import WrapperContainer from '../../Components/WrapperContainer';
import imagePath from '../../constants/imagePath';
import colors from '../../styles/colors';
import fontFamily from '../../styles/fontFamily';
import { textScale } from '../../styles/responsiveSize';
import { styles } from './styles';
import { sendOtp, verifyOtp } from '../../redux/actions/auth';
import { showSuccess } from '../../utils/helperFunctions';
interface RouteParams{
params:{  phonenumber: Number,
  email: String,
  name: String,
  password: String,
  isAdmin: Boolean,
  _id:any
}
}
interface PropTypes {
  route?: RouteParams;
}
interface ConponentState {
  otpInput:any
}
const OtpVerify: FC<PropTypes> = ({route}: PropTypes) => {
  const {t} = useTranslation();
  const navigation = useNavigation();
  let otpInputRef = useRef(null);

  const [state, setState] = useState<ConponentState>({otpInput:null});
  const {otpInput} = state;

  const updateState = (data: Partial<ConponentState>) =>
  setState(state => ({...state, ...data}));
  useEffect(()=>{
    sendmyOtp()
  },[])
  const sendmyOtp=async()=>{
    const res = await sendOtp(route?.params)
    showSuccess(res?.message);
  }

  const verifyMyOtp =async()=>{
  await verifyOtp({otp:otpInput,id:route?.params?._id})
  }
  return (
    <WrapperContainer>
  <View style={styles.header}>
  <TouchableOpacity style={{marginHorizontal:moderateScale(12)}} onPress={()=>{navigation.goBack()}}>
    <Image source={imagePath.backAngle}/>
  </TouchableOpacity>
  <Text style={styles.verifycode}>
    {t('Verification_Code')}
  </Text>
  </View> 
  <View style={styles.topview}>
    <Text style={styles.codesendto}>
      {t("A_code_has_been_sent_to")}
      <Text style={styles.usernumber}>{`+91 ${route?.params?.phonenumber}`}</Text>
    </Text>
    <View style={styles.inputContainer}>
      <OTPTextView 
      inputCount={6}
      ref={otpInputRef}
      tintColor={colors.themeColor}
      keyboardType='numeric'
      textInputStyle={styles.boxInput}
      handleTextChange={(val)=>{updateState({otpInput:val})}}
      autoFocus/>
    </View>
    <View style={styles.didNtRecieve}>
      <Text style={{color:colors.black}}>
        {t('Did_not_recieved_the_code')}
      </Text>
      <TouchableOpacity
      onPress={sendmyOtp}
      >
        <Text style={styles.resend}>
          {t('RESEND_CODE')}
        </Text>
      </TouchableOpacity>
    </View>
  </View>
  <GradientButton
  onPress={verifyMyOtp}
  btnText={t('VERIFY')}/>
</WrapperContainer>
  );
};

export default OtpVerify;
