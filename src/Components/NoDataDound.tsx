import {View, Text} from 'react-native';
import React, {FC} from 'react';
import {t} from 'i18next';
import FastImage from 'react-native-fast-image';
import imagePath from '../constants/imagePath';
import {height, textScale, width} from '../styles/responsiveSize';
import colors from '../styles/colors';
import {moderateVerticalScale} from 'react-native-size-matters';
import fontFamily from '../styles/fontFamily';
interface props {
  route?: {
    params?: {
      title: string;
    };
  };
}
const NoDataDound: FC<props> = ({route}: props) => {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: moderateVerticalScale(height / 8),
      }}>
      <FastImage
        resizeMode="contain"
        style={{height: height / 7, width: width / 3}}
        tintColor={colors.backgroundGreyB}
        source={imagePath.empty}
      />
      <Text
        style={{
          textAlign: 'center',
          marginTop: moderateVerticalScale(24),
          fontFamily: fontFamily.ProximaNovaMedium,
          fontSize: textScale(18),
          color:colors.black
        }}>
        {t('NO_DATA_FOUND')}
      </Text>
    </View>
  );
};

export default NoDataDound;
