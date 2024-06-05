import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import React, { useRef, useState } from 'react';
import {
  Image,
  NativeScrollEvent,
  NativeSyntheticEvent,
  ScrollView,
  View,
} from 'react-native';
import { moderateScale, moderateVerticalScale, scale } from 'react-native-size-matters';
import TextContainer from '../../Components/TextContainer';
import WrapperContainer from '../../Components/WrapperContainer';
import imagePath from '../../constants/imagePath';
import navigationStrings from '../../constants/navigationStrings';
import colors from '../../styles/colors';
import fontFamily from '../../styles/fontFamily';
import { height, textScale, width } from '../../styles/responsiveSize';
import { styles } from './styles';

const onBoardData = [
  {
    id: 1,
    heading: 'About Roash',
    image: imagePath.onboard3,
    description:
      'Roash integrate all our services to bring the best use of social media. We create content that have tailored to the context of each individual social media platform in order to drive user enagagement, build brand and increase sales.',
  },
  {
    id: 2,
    image: imagePath.onboard2,
    heading: 'Review Powerhouse for Amazon, Flipkart & Beyond!',
    description:
      'Ditch the review rat race, Dizimods takes the wheel! We manage your Amazon, Flipkart & more ratings and reviews, so you can focus on what you do best – selling!',
  },
  {
    id: 3,
    image: imagePath.onboard1,
    heading: "Here's how we turn your Ecomerce game into a gold mine",
    description:
      'Our team of seasoned product testers and writers dissects your products with laser-sharp focus, highlighting their strengths',
  },
];

const Onboarding = (): React.JSX.Element => {
  const navigation = useNavigation<StackNavigationProp<any>>();
  const [index, setIndex] = useState<number>(0);
  const scrollRef = useRef<ScrollView>(null);

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const newIndex = Number(
      (event.nativeEvent.contentOffset.x / (width - 20)).toFixed(0),
    );
    setIndex(newIndex);
  };

  return (
    <WrapperContainer>
      <View style={styles.container}>
        <ScrollView
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onMomentumScrollEnd={handleScroll}
          ref={scrollRef}>
          {onBoardData.map(val => (
            <View
              style={{
                width: width - 24,
                paddingHorizontal: moderateScale(16),
              }}
              key={String(val.id)}>
              <Image
                source={val?.image}
                resizeMode="contain"
                style={{
                  height: height / 2.1,
                  width: '100%',
                }}
              />
              <TextContainer
                isDynamicText
                text={val?.heading}
                style={{
                  fontSize: textScale(30),
                  marginVertical: moderateVerticalScale(12),
                }}
              />
              <TextContainer
                isDynamicText
                text={val?.description}
                style={{
                  fontSize: scale(16),
                  fontFamily: fontFamily.ProximaNovaRegular,
                }}
              />
            </View>
          ))}
        </ScrollView>
        <View style={styles.flexView}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            {onBoardData.map((val, i) => (
              <View
                key={String(val.id)}
                style={{
                  ...styles.dotStyle,
                  backgroundColor:
                    i === index ? colors.themeColor : colors.greyA,
                }}
              />
            ))}
          </View>
          <View>
            <TextContainer
              style={{color: colors.themeColor}}
              text="SKIP"
              onPress={() => navigation.navigate(navigationStrings.Login)}
            />
          </View>
        </View>
      </View>
    </WrapperContainer>
  );
};

export default Onboarding;
