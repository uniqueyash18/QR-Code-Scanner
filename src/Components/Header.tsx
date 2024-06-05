import {
  View,
  Text,
  Image,
  ImageSourcePropType,
  TouchableOpacity,
} from 'react-native';
import React, {FC} from 'react';
import imagePath from '../constants/imagePath';
import {useNavigation} from '@react-navigation/native';
import fontFamily from '../styles/fontFamily';
import {textScale} from '../styles/responsiveSize';
import {moderateVerticalScale} from 'react-native-size-matters';
import colors from '../styles/colors';
interface Proptypes {
  cetnerTitle?: String;
  leftIcon?: String;
  OnPressLeft?: () => void;
  isRightIcon?: Boolean;
  RightIcon?: String;
  OnPressRight?: () => void;
  isCustomLeft?: Boolean;
  isLeft?: Boolean;
}
const Header: FC<Proptypes> = ({
  cetnerTitle,
  leftIcon,
  OnPressLeft,
  isRightIcon,
  RightIcon,
  OnPressRight,
  isCustomLeft,
  isLeft,
}: Proptypes) => {
  const navigation = useNavigation();
  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: moderateVerticalScale(12),
      }}>
        <View
          style={{flex: 0.1, alignItems: 'center', justifyContent: 'center'}}>
      {!!isLeft && (
        <>
          {!!isCustomLeft ? (
            <TouchableOpacity onPress={OnPressLeft}>
              <Image source={leftIcon as ImageSourcePropType} />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Image source={imagePath.backAngle} />
            </TouchableOpacity>
          )}
        </>
      )}
      </View>
      <Text
        style={{
          flex: 1,
          textAlign: 'center',
          fontFamily: fontFamily.ProximaNovaBold,
          fontSize: textScale(20),
          color:colors.black
        }}>
        {cetnerTitle}
      </Text>
      <View  style={{flex: 0.1}} >
      {!!isRightIcon && (
        <TouchableOpacity onPress={OnPressRight}>
          <Image source={RightIcon as ImageSourcePropType} />
        </TouchableOpacity>
      )}
       </View>
    </View>
  );
};

export default Header;
