import {View, Text} from 'react-native';
import React, {FC} from 'react';
import WebView from 'react-native-webview';
import Header from '../../Components/Header';
import WrapperContainer from '../../Components/WrapperContainer';
interface propTypes {
  route?: {
    params?: {
      link: string;
      type:string
    };
  };
  params?: object;
}
const Webview: FC<propTypes> = ({route}: propTypes) => {
  var link = route?.params?.link;
  var type = route?.params?.type;
  return (
   <WrapperContainer>
        <Header isLeft={true} cetnerTitle={`Fill ${type} Form`}/>
      <WebView 
      showsVerticalScrollIndicator={false}
       source={{uri:link}} style={{flex: 1}} />
    </WrapperContainer>
  );
};

export default Webview;
