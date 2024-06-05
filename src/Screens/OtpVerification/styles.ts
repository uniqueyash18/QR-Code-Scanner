import {StyleSheet} from 'react-native';
import {moderateScale, moderateVerticalScale} from 'react-native-size-matters';
import {textScale} from '../../styles/responsiveSize';
import colors from '../../styles/colors';
import fontFamily from '../../styles/fontFamily';

export const styles = StyleSheet.create({
  header: {
    marginTop: moderateVerticalScale(60),
    flexDirection: 'row',
    alignItems: 'center',
  },
  verifycode: {
    fontSize: textScale(24),
    flex: 1,
    fontWeight: '600',
    color: colors.black,
    fontFamily:fontFamily.ProximaNovaBold
  },
  topview:{
    flex:0.5
  },
  codesendto:{
    marginTop:moderateVerticalScale(30),
    textAlign:'center',
    fontSize:textScale(14),
    fontFamily:fontFamily.ProximaNovaRegular,
    color:colors.black
  },
  usernumber:{
 fontFamily:fontFamily.ProximaNovaBold,
 color:colors.black
  },
  boxInput:{
    borderWidth:1,
    borderBottomWidth:1,
    borderRadius:moderateScale(6)
  },
  inputContainer:{
    marginVertical:moderateVerticalScale(14),
    alignItems:'center'
  },
  didNtRecieve:{
    flexDirection:'row',
    justifyContent:'center',
    alignItems:'center',
    fontFamily:fontFamily.ProximaNovaRegular
  },
  resend:{
    color:colors.themeColor,
    fontFamily:fontFamily.ProximaNovaMedium,
    fontSize:textScale(14)
  }
});
