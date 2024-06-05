import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { FC } from 'react';
import FastImage, { Source } from 'react-native-fast-image';
import { moderateScale, moderateVerticalScale } from 'react-native-size-matters';
import { textScale } from '../styles/responsiveSize';
import fontFamily from '../styles/fontFamily';
import imagePath from '../constants/imagePath';
import colors from '../styles/colors';

interface Proptypes {
  leftIcon: string;
  centerTitle: string;
  onPressItem: () => void;
  containerStyles?: object;
  title?:string
}

const AccountListComp: FC<Proptypes> = ({
  leftIcon,
  centerTitle,
  onPressItem,
  containerStyles,
  title
}) => {
  return (
    <>
    {title && <View style={styles.title}>
      <Text style={styles.titletext}>
        {title}
      </Text>
    </View>}
    <TouchableOpacity onPress={onPressItem} style={[styles.container, containerStyles]}>
      <View style={styles.card}>
        <Image
          source={leftIcon as any}
          style={styles.imageStyle}
        />
        <Text style={styles.textStyle}>{centerTitle}</Text>
        <Image
          source={imagePath.backAngle}
          resizeMode="contain"
          style={styles.rightImageStyle}
        />
      </View>
    </TouchableOpacity>
    </>
  );
};

export default AccountListComp;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: moderateVerticalScale(10),
    backgroundColor: colors.white,
    borderRadius: moderateScale(8),
    shadowColor: colors.black, 
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.6,
    shadowRadius: 6,
    elevation: 5,
  },
  card: {
    flex: 1, 
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: moderateScale(16),
    paddingVertical: moderateVerticalScale(14),
  },
  imageStyle: {
    height: moderateVerticalScale(22),
    width: moderateScale(22),
    flex: 0.2,
    resizeMode: 'contain',
  },
  textStyle: {
    fontSize: textScale(16),
    flex: 1,
    fontFamily: fontFamily.ProximaNovaMedium,
    color: colors.blackOpacity70,
  },
  rightImageStyle: {
    height: moderateVerticalScale(16),
    width: moderateScale(16),
    transform: [{ rotate: '180deg' }],
    resizeMode: 'contain',
  },
  title:{
    marginTop:moderateScale(12)
  },
  titletext:{
    fontFamily:fontFamily.ProximaNovaMedium,
    fontSize:textScale(16),
    color:colors.blackOpacity86
  }
});