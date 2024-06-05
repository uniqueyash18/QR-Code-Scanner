import {StyleSheet} from 'react-native';
import {textScale} from '../../styles/responsiveSize';
import fontFamily from '../../styles/fontFamily';
import {moderateScale, moderateVerticalScale} from 'react-native-size-matters';
import colors from '../../styles/colors';

export const styles = StyleSheet.create({
  topview: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 0.3,
  },
  logintxt: {
    fontSize: textScale(32),
    fontFamily: fontFamily.medium,
    color:colors.black,
    marginBottom:moderateVerticalScale(24),
    textAlign:'center'
  },
  bottomview: {
    marginTop: moderateVerticalScale(54),
    flex:1
  },
  inputarea: {
    marginTop: moderateVerticalScale(24),
  },
  forgot: {
    textAlign: 'right',
    fontSize: textScale(14),
    color: colors.themeColor,
    marginTop:moderateVerticalScale(12)
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
    marginTop:moderateVerticalScale(24)
  },
  socialbox:{
    backgroundColor:colors.blackOpacity10,
    padding:moderateScale(16),
    borderRadius:moderateScale(50),
    borderColor:colors.themeColor,
    borderWidth:moderateScale(1),
  }
});
