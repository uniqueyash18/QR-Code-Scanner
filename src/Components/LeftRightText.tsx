import {View, Text, StyleSheet, StyleSheetProperties, Clipboard} from 'react-native';
import React, {FC} from 'react';
import fontFamily from '../styles/fontFamily';
import {textScale, width} from '../styles/responsiveSize';
import colors from '../styles/colors';
import {moderateVerticalScale} from 'react-native-size-matters';
interface propTypes {
  leftText: string;
  rightText: string;
  rightStyles?: object;
  leftStyles?: object;
  isCopy?:boolean
}
const LeftRightText: FC<propTypes> = ({
  leftText,
  rightText,
  rightStyles,
  leftStyles,
  isCopy
}: propTypes) => {
  return (
    <>
    <View style={styles.box}>
      <Text style={{...styles.leftText, ...leftStyles}}>{leftText}</Text>
      {isCopy ?
      <Text onPress={()=>Clipboard.setString(rightText)} style={{...styles.rightText, ...rightStyles}}>{rightText}</Text>
      :
      <Text style={{...styles.rightText, ...rightStyles}}>{rightText}</Text>
      } 
    </View>
     <View style={styles.line}/>
     </>
  );
};

export default LeftRightText;
const styles = StyleSheet.create({
  box: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: moderateVerticalScale(12),
  },
  leftText: {
    fontFamily: fontFamily.ProximaNovaMedium,
    fontSize: textScale(14),
    color: colors.black,
    // width:width/2.5,
    flex:1
  },
  rightText: {
    fontFamily: fontFamily.ProximaNovaMedium,
    fontSize: textScale(14),
    // width:width/2.5,
    flex:1,
    textAlign:'right',
    color:colors.black
  },
  line:{
    borderBottomColor:colors.borderColor,
    borderBottomWidth:1,
    marginTop:moderateVerticalScale(8)
  }
});
