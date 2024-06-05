import {StyleSheet} from 'react-native';
import {textScale} from '../../styles/responsiveSize';
import fontFamily from '../../styles/fontFamily';
import {moderateVerticalScale} from 'react-native-size-matters';
import colors from '../../styles/colors';

export const styles = StyleSheet.create({
  topview: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: moderateVerticalScale(30),
  },
  logintxt: {
    fontSize: textScale(32),
    fontFamily: fontFamily.medium,
    marginTop: moderateVerticalScale(30),
    color:colors.black,
    marginBottom:moderateVerticalScale(24),
    textAlign:'center'
  },
  bottomview: {
    paddingTop:moderateVerticalScale(54)
  },
  inputarea: {
    marginTop: moderateVerticalScale(24),
  },
  forgot: {
    textAlign: 'right',
    fontSize: textScale(14),
    color: colors.themeColor,
  },
  horizontalLine: {
    height: 1,
    borderWidth: 1,
    borderColor: colors.borderColor,
    flex: 1,
  },
  orLoginView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical:moderateVerticalScale(32)
  },
  socialview:{
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'center'
  },
  dontHaveAcc:{
    alignItems:'center',
    marginVertical:moderateVerticalScale(12)
  },
});
