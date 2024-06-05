import { StyleSheet, Text, View } from 'react-native'
import React, { FC } from 'react'
import WrapperContainer from '../../Components/WrapperContainer'
import WebView from 'react-native-webview';
import Header from '../../Components/Header';
import { t } from 'i18next';
import { aboutUs } from '../../utils/aboutUs';
import { moderateScale } from 'react-native-size-matters';

const AboutUs:FC = () => {
  return (
    <WrapperContainer>
      <Header isLeft={true} cetnerTitle={t('About Us')} />
      <WebView
        originWhitelist={['*']}
        source={{ html: aboutUs }}
        style={styles.webview}
      />
      <View style={{height: moderateScale(60)}} />
    </WrapperContainer>
  );
};
export default AboutUs
const styles = StyleSheet.create({
  webview: {
    flex: 1,
  },
});