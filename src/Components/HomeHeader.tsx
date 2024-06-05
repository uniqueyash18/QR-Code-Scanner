import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  TextInput,
} from 'react-native';
import React, {FC, useState} from 'react';
import WrapperContainer from './WrapperContainer';
import FastImage from 'react-native-fast-image';
import imagePath from '../constants/imagePath';
import {moderateScale, moderateVerticalScale} from 'react-native-size-matters';
import {textScale, width} from '../styles/responsiveSize';
import fontFamily from '../styles/fontFamily';
import colors from '../styles/colors';
import { isEmpty } from 'lodash';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
interface Proptypes {
  onPressLoc?: Function;
  onPressSearch?:()=>void;
}
const HomeHeader: FC<Proptypes> = ({ onPressLoc,onPressSearch}: Proptypes) => {
  const currentLocation = useSelector(
    (state: RootState) => state?.auth?.location,
  );
  const [currLocation,setCurrLocation]=useState(currentLocation as any)
  return (
    <View>
      <View style={styles.container}>
        <FastImage
          source={imagePath.ooryksIcon}
          resizeMode="contain"
          style={styles.iconStyle}
        />
        {!isEmpty(currLocation) ? <View style={styles.centerarea}>
          <Image source={imagePath.locationIcon} />
          <Text numberOfLines={1} style={styles.location}>
           {currLocation?.display_name}
          </Text>
        </View>:
       <View style={styles.centerarea}>
       <Image source={imagePath.locationIcon} />
       <Text numberOfLines={1} style={styles.location}>
        Searching for location...
       </Text>
     </View>
        }
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: moderateVerticalScale(12),
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconStyle: {
    height: moderateVerticalScale(70),
    width: moderateScale(40),
    flex: 0.1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  centerarea: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  location: {
    marginHorizontal: moderateScale(12),
    maxWidth: moderateScale(width / 1.5),
    textAlign: 'center',
    fontFamily: fontFamily.ProximaNovaMedium,
    fontSize: textScale(14),
    color:colors.black
  },
});
export default HomeHeader;
