import React, { FC } from 'react';
import { StyleSheet, View } from 'react-native';
import { WebView } from 'react-native-webview';
import { t } from 'i18next';
import WrapperContainer from '../../Components/WrapperContainer';
import Header from '../../Components/Header';
import { termsCondition } from '../../utils/termsCondition';
import { moderateScale } from 'react-native-size-matters';

const TermsCondition: FC = () => {
  return (
    <WrapperContainer>
      <Header isLeft={true} cetnerTitle={t('TERMS_AND_CONDITION')} />
      <WebView
        originWhitelist={['*']}
        source={{ html: termsCondition }}
        style={styles.webview}
      />
      <View style={{height: moderateScale(60)}} />
    </WrapperContainer>
  );
};

const styles = StyleSheet.create({
  webview: {
    flex: 1,
  },
});

export default TermsCondition;
