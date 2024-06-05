import {StyleSheet, Text, View} from 'react-native';
import React, {FC} from 'react';
import WrapperContainer from '../../Components/WrapperContainer';
import colors from '../../styles/colors';
import {height, textScale, width} from '../../styles/responsiveSize';
import {moderateScale, moderateVerticalScale} from 'react-native-size-matters';
import GradientButton from '../../Components/GradientButton';
import {t} from 'i18next';
import fontFamily from '../../styles/fontFamily';
import Header from '../../Components/Header';
import {
  makePhoneCall,
  sendEmail,
  sendTextMessage,
  sendWhatsAppMessage,
} from '../../utils/helperFunctions';
interface props {
  route?: {};
}
const ContactUs: FC<props> = ({route}: props) => {
  return (
    <WrapperContainer>
      <Header isLeft={true} cetnerTitle={t('CONTACT_US')} />
      <View style={styles.container}>
        <View style={styles.innerBox}>
          <GradientButton
            onPress={() => makePhoneCall('8318729508')}
            btnStyle={styles.btnstyle}
            btnText={'Get in Touch'}
          />
          <GradientButton
            colorsArray={[colors.redB, colors.redB]}
            onPress={() => sendEmail('rohangill20.7@gmail.com')}
            btnStyle={styles.btnstyle}
            btnText={'Drop Us an Mail'}
          />
          <GradientButton
            onPress={() => sendTextMessage('8318729508')}
            btnStyle={styles.btnstyle}
            colorsArray={[colors.blue, colors.blue]}
            btnText={'Send a Message'}
          />
          <GradientButton
            onPress={() => sendWhatsAppMessage('8318729508', 'I Have a query')}
            colorsArray={[colors.green, colors.green]}
            btnStyle={styles.btnstyle}
            btnText={'Chat on Whatsapp'}
          />
        </View>
      </View>
    </WrapperContainer>
  );
};

export default ContactUs;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    // justifyContent: 'center',
    paddingTop: moderateVerticalScale(80),
  },
  innerBox: {
    width: moderateScale(width / 1.2),
    height: moderateVerticalScale(height / 2),
    backgroundColor: colors.white,
    padding: moderateScale(24),
    borderRadius: moderateScale(16),
    elevation: 4,
  },
  heading: {
    fontFamily: fontFamily.ProximaNovaBold,
    fontSize: textScale(32),
    marginBottom: moderateScale(24),
    color: colors.black,
  },
  btnstyle: {
    borderRadius: moderateScale(50),
    height: moderateVerticalScale(50),
  },
});
