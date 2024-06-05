import React, {FC, useEffect, useState} from 'react';
import {Alert, FlatList, RefreshControl, ScrollView, Text, View} from 'react-native';
import {moderateVerticalScale} from 'react-native-size-matters';
import {
  Camera,
  useCameraDevice,
  useCameraPermission,
  useCodeScanner,
} from 'react-native-vision-camera';
import HomeHeader from '../../Components/HomeHeader';
import WrapperContainer from '../../Components/WrapperContainer';
import usePostData from '../../hooks/usePostData';
import {ADD_BAR_CODE, GET_EXCEL_DATA} from '../../services/routes';
import fontFamily from '../../styles/fontFamily';
import {height, textScale, width} from '../../styles/responsiveSize';
import {showError, showSuccess} from '../../utils/helperFunctions';
import useCustomQuery from '../../hooks/useCustomQuery';
import colors from '../../styles/colors';
interface props {
  route?: any;
}
type itemType = {
  item?: {
    codeNumber: string;
    date: string;
  };
  index: number;
};
const Home: FC<props> = (route: props) => {
  const {hasPermission, requestPermission} = useCameraPermission();
  const device = useCameraDevice('back');
  const [scannerEnabled, setScannerEnabled] = useState(true);
  const {
    data: excelData,
    isFetching,
    isError,
    refetch,
  } = useCustomQuery<any>(GET_EXCEL_DATA);
  console.log(excelData, 'datadatadata');
  const {mutate: onUploadCode, isPending} = usePostData(ADD_BAR_CODE, {
    onSuccess: async (data: any) => {
      console.log(data, 'datadata');
      showSuccess(data?.data?.message);
      refetch();
      setTimeout(() => {
        setScannerEnabled(true);
      }, 2000);
    },
    onError: async error => {
      setScannerEnabled(true);
      showError(error);
    },
  });

  useEffect(() => {
    if (!hasPermission) {
      requestPermission();
    }
  });

  const codeScanner = useCodeScanner({
    codeTypes: [
      'upc-a',
      'qr',
      'ean-13',
      'aztec',
      'codabar',
      'code-128',
      'code-39',
      'code-93',
      'data-matrix',
      'ean-8',
      'itf',
      'pdf-417',
      'upc-e',
    ],
    onCodeScanned: (codes: any) => {
      setScannerEnabled(false);
      if (!!scannerEnabled) {
        Alert.alert(
          '',
          `${codes[0]?.value} scanned successfully,Do you wants to upload`,
          [
            {
              text: 'No, Scan again',
              onPress: () => {
                setTimeout(() => {
                  setScannerEnabled(true);
                }, 1000);
              },
            },
            {
              text: 'Yes',
              onPress: () => {
                onUploadCode({
                  codeNumber: codes[0]?.value,
                  date: new Date().toLocaleString(),
                });
              },
            },
          ],
        );
      }
    },
  });
  const dataView = ({item, index}: itemType) => {
    return (
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
        <Text
          style={{
            fontFamily: fontFamily.ProximaNovaRegular,
            color: colors.black,
            flex:1
          }}>
          {index + 1}. {item?.codeNumber}
        </Text>
        <Text
          style={{
            flex: 1,
            textAlign: 'right',
            fontFamily: fontFamily.ProximaNovaRegular,
            color: colors.black,
          }}>
          {item?.date}
        </Text>
        <Text></Text>
      </View>
    );
  };
  const dataHeader = () => {
    return (
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginVertical: moderateVerticalScale(12),
        }}>
        <Text
          style={{
            fontSize: textScale(16),
            fontFamily: fontFamily.ProximaNovaBold,
            color: colors.black,
          }}>
          Parcel Number
        </Text>
        <Text
          style={{
            flex: 1,
            textAlign: 'right',
            fontSize: textScale(16),
            fontFamily: fontFamily.ProximaNovaBold,
            color: colors.black,
          }}>
          Date
        </Text>
      </View>
    );
  };
  return (
    <WrapperContainer>
      <HomeHeader />
      <ScrollView
      showsVerticalScrollIndicator={false}
      refreshControl={
        <RefreshControl refreshing={isPending||isFetching} onRefresh={refetch} />
      }
      style={{flex: 1}}>
        <Text
          style={{
            fontFamily: fontFamily.ProximaNovaBold,
            fontSize: textScale(18),
            marginBottom: moderateVerticalScale(12),
            color:colors.black,
            textAlign:'center'
          }}>
          Scan the code
        </Text>
        <Camera
          style={{
            width: width - 24,
            height: height / 2,
            paddingTop: moderateVerticalScale(50),
            alignSelf:"center"
          }}
          device={device as any}
          isActive={true}
          codeScanner={codeScanner}
        />
        <View>
          <FlatList
            data={excelData}
            renderItem={dataView}
            ListHeaderComponent={dataHeader}
          />
        </View>
        <View style={{marginBottom:moderateVerticalScale(100)}}/>
      </ScrollView>
    </WrapperContainer>
  );
};

export default Home;
